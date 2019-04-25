/* tslint:disable:completed-docs*/
import { Deserialize, Serialize } from "cerialize";
import { Observable, throwError, timer } from "rxjs";
// FIXME Adapt mergeMap code --> See: https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md#howto-result-selector-migration
import { catchError, map, mergeMap, retryWhen } from "rxjs/operators";
import { Inject, Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";

import { StarkHttpService, starkHttpServiceName } from "./http.service.intf";

import { StarkHttpHeaders } from "../constants";
import {
	StarkCollectionMetadataImpl,
	StarkCollectionResponseWrapper,
	StarkCollectionResponseWrapperImpl,
	StarkHttpErrorWrapperImpl,
	StarkHttpRawCollectionResponseData,
	StarkHttpRequest,
	StarkHttpRequestType,
	StarkResource,
	StarkSingleItemResponseWrapper,
	StarkSingleItemResponseWrapperImpl
} from "../entities";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "../../logging/services";
import { STARK_SESSION_SERVICE, StarkSessionService } from "../../session/services";

/**
 *  @ignore
 */
const _cloneDeep: Function = require("lodash/cloneDeep");

/**
 * @ignore
 * Service to make HTTP calls in compliance with the guidelines from the NBB REST API Design Guide.
 */
@Injectable()
export class StarkHttpServiceImpl<P extends StarkResource> implements StarkHttpService<P> {
	protected retryDelay: number = 1000;

	public constructor(
		@Inject(STARK_LOGGING_SERVICE) private logger: StarkLoggingService,
		@Inject(STARK_SESSION_SERVICE) private sessionService: StarkSessionService,
		private httpClient: HttpClient
	) {
		this.logger.debug(starkHttpServiceName + " loaded");
	}

	public executeSingleItemRequest(request: StarkHttpRequest<P>): Observable<StarkSingleItemResponseWrapper<P>> {
		// remove the etag before executing the request
		request = this.removeETagFromRequestItem(request);

		// dev-authentication support
		if (ENV === "development" && request.backend.devAuthenticationEnabled) {
			request = this.addDevAuthenticationHeaders(request);
		}

		// add correlation identifier
		request = this.addCorrelationIdentifierHeader(request);

		// IMPORTANT: In Angular2+ HTTP service subscribing multiple times will actually do multiple requests
		// see https://angular.io/guide/http#always-subscribe
		let httpResponse$: Observable<HttpResponse<P>> | undefined;

		switch (request.requestType) {
			case StarkHttpRequestType.GET:
				httpResponse$ = this.performGetRequest(request);
				break;
			case StarkHttpRequestType.DELETE:
				httpResponse$ = this.performDeleteRequest(request);
				break;
			case StarkHttpRequestType.UPDATE:
				httpResponse$ = this.performUpdateRequest(request);
				break;
			case StarkHttpRequestType.UPDATE_IDEMPOTENT:
				httpResponse$ = this.performUpdateRequest(request);
				break;
			case StarkHttpRequestType.CREATE:
				httpResponse$ = this.performCreateRequest(request);
				break;
			default:
				httpResponse$ = undefined;
		}

		if (httpResponse$) {
			return this.getSingleItemResponseWrapperObservable(httpResponse$, request);
		} else {
			return throwError(
				"Unknown request type encountered " +
					request.requestType +
					". For collection requests, " +
					"call the executeCollectionRequest method"
			);
		}
	}

	public executeCollectionRequest(request: StarkHttpRequest<P>): Observable<StarkCollectionResponseWrapper<P>> {
		// dev-authentication support
		if (ENV === "development" && request.backend.devAuthenticationEnabled) {
			request = this.addDevAuthenticationHeaders(request);
		}

		// add correlation identifier
		request = this.addCorrelationIdentifierHeader(request);

		// IMPORTANT: In Angular2+ HTTP service subscribing multiple times will actually do multiple requests
		// see https://angular.io/guide/http#always-subscribe
		let httpResponse$: Observable<HttpResponse<StarkHttpRawCollectionResponseData<P>>> | undefined;

		switch (request.requestType) {
			case StarkHttpRequestType.GET_COLLECTION:
				httpResponse$ = this.performGetCollectionRequest(request);
				break;
			case StarkHttpRequestType.SEARCH:
				httpResponse$ = this.performSearchRequest(request);
				break;
			default:
				httpResponse$ = undefined;
		}

		if (httpResponse$) {
			return this.getCollectionResponseWrapperObservable(httpResponse$, request);
		} else {
			// we return directly here because otherwise compilation fails (can't assign the ErrorObservable type to Subject)
			return throwError(
				"Unknown request type encountered " +
					request.requestType +
					". For single requests (no " +
					"collection), call the executeSingleItemRequest method"
			);
		}
	}

	/**
	 * remove the etag before executing the request
	 * We have to remove it otherwise it'll be serialized and cause issues on the back-end
	 * @param request - The request object to modify
	 * @returns The modified request object
	 */
	public removeETagFromRequestItem(request: StarkHttpRequest<P>): StarkHttpRequest<P> {
		let requestCopy: StarkHttpRequest<P> = request;

		if (request.item) {
			requestCopy = _cloneDeep(request);
			const itemWithoutETag: P = _cloneDeep(<P>requestCopy.item);
			delete itemWithoutETag.etag;
			requestCopy.item = itemWithoutETag;
		}

		return requestCopy;
	}

	/**
	 * add authentication headers necessary for non-production environments
	 * @param request - The request object to modify
	 * @returns The modified request object
	 */
	public addDevAuthenticationHeaders(request: StarkHttpRequest<P>): StarkHttpRequest<P> {
		this.logger.debug(starkHttpServiceName + ": Adding dev-authentication headers");

		const requestCopy: StarkHttpRequest<P> = _cloneDeep(request);

		// add the preAuthentication headers to the request headers
		this.sessionService.devAuthenticationHeaders.forEach((value: string, header: string) => {
			requestCopy.headers.set(header, value);
		});

		return requestCopy;
	}

	/**
	 * add header for activity correlation
	 * @param request - The request object to modify
	 * @returns The modified request object
	 */
	public addCorrelationIdentifierHeader(request: StarkHttpRequest<P>): StarkHttpRequest<P> {
		if (this.logger.correlationIdHttpHeaderName && this.logger.correlationIdHttpHeaderName.length > 0) {
			this.logger.debug(starkHttpServiceName + ": Adding correlation identifier header");
			const requestCopy: StarkHttpRequest<P> = _cloneDeep(request);
			requestCopy.headers.set(this.logger.correlationIdHttpHeaderName, this.logger.correlationId);
			return requestCopy;
		}

		return request;
	}

	public get rawHttpClient(): HttpClient {
		return this.httpClient;
	}

	private performCreateRequest(request: StarkHttpRequest<P>): Observable<HttpResponse<P>> {
		return this.httpClient.post<P>(
			request.backend.url + "/" + request.resourcePath,
			// serialize returns a pre-stringified json object, Angular will generate a string out of it
			this.serialize(<P>request.item, request),
			{
				params: this.convertMapIntoObject(request.queryParameters),
				headers: this.convertMapIntoObject(request.headers),
				observe: "response", // full response, not only the body
				responseType: "json" // body as JSON
			}
		);
	}

	private performUpdateRequest(request: StarkHttpRequest<P>): Observable<HttpResponse<P>> {
		const requestUrl: string = request.backend.url + "/" + request.resourcePath;
		// serialize returns a pre-stringified json object, Angular will generate a string out of it
		const requestData: string | object = this.serialize(<P>request.item, request);

		if (request.requestType === StarkHttpRequestType.UPDATE_IDEMPOTENT) {
			return this.httpClient.put<P>(requestUrl, requestData, {
				params: this.convertMapIntoObject(request.queryParameters),
				headers: this.convertMapIntoObject(request.headers),
				observe: "response", // full response, not only the body
				responseType: "json" // body as JSON
			});
		} else {
			return this.httpClient.post<P>(requestUrl, requestData, {
				params: this.convertMapIntoObject(request.queryParameters),
				headers: this.convertMapIntoObject(request.headers),
				observe: "response", // full response, not only the body
				responseType: "json" // body as JSON
			});
		}
	}

	private performDeleteRequest(request: StarkHttpRequest<P>): Observable<HttpResponse<P>> {
		return this.httpClient.delete<P>(request.backend.url + "/" + request.resourcePath, {
			params: this.convertMapIntoObject(request.queryParameters),
			headers: this.convertMapIntoObject(request.headers),
			observe: "response", // full response, not only the body
			responseType: "json" // body as JSON
		});
	}

	private performGetRequest(request: StarkHttpRequest<P>): Observable<HttpResponse<P>> {
		return this.httpClient.get<P>(request.backend.url + "/" + request.resourcePath, {
			params: this.convertMapIntoObject(request.queryParameters),
			headers: this.convertMapIntoObject(request.headers),
			observe: "response", // full response, not only the body
			responseType: "json" // body as JSON
		});
	}

	private performGetCollectionRequest(request: StarkHttpRequest<P>): Observable<HttpResponse<StarkHttpRawCollectionResponseData<P>>> {
		return this.httpClient.get<StarkHttpRawCollectionResponseData<P>>(request.backend.url + "/" + request.resourcePath, {
			params: this.convertMapIntoObject(request.queryParameters),
			headers: this.convertMapIntoObject(request.headers),
			observe: "response", // full response, not only the body
			responseType: "json" // body as JSON
		});
	}

	private performSearchRequest(request: StarkHttpRequest<P>): Observable<HttpResponse<StarkHttpRawCollectionResponseData<P>>> {
		return this.httpClient.post<StarkHttpRawCollectionResponseData<P>>(
			request.backend.url + "/" + request.resourcePath,
			// Serialize returns a pre-stringified json object, Angular will generate a string out of it
			Serialize(request.item), // the search criteria comes in the request item
			{
				params: this.convertMapIntoObject(request.queryParameters),
				headers: this.convertMapIntoObject(request.headers),
				observe: "response", // full response, not only the body
				responseType: "json" // body as JSON
			}
		);
	}

	private convertMapIntoObject(mapObj: Map<string, any>): { [param: string]: any } {
		const resultObj: { [param: string]: any } = {};

		mapObj.forEach((value: any, key: string) => {
			resultObj[key] = value;
		});

		return resultObj;
	}

	// TODO: return the Angular HttpHeaders or still return our own Map?
	private getResponseHeaders(httpHeaders: HttpHeaders): Map<string, string> {
		const httpResponseHeaders: Map<string, string> = new Map<string, string>();
		for (const headerName of httpHeaders.keys()) {
			httpResponseHeaders.set(headerName, <string>httpHeaders.get(headerName));
		}

		return httpResponseHeaders;
	}

	private getSingleItemResponseWrapperObservable(
		httpResponse$: Observable<HttpResponse<P>>,
		request: StarkHttpRequest<P>
	): Observable<StarkSingleItemResponseWrapper<P>> {
		const retryCount: number = request.retryCount || 0;

		if (retryCount > 0) {
			httpResponse$ = this.addRetryLogic(httpResponse$, retryCount);
		}

		// The stack information in the Http Error (catchError) contains the execution statements of the http call.
		// That information is not useful for the developer.
		// To get a meaningful stack, a dummy meaningful error is created before the subscription to the webservice.
		// This meaningfulError is sent to the StarkHttpErrorWrapperImpl and contains all statements up to this method.
		let meaningfulError: Error = new Error(starkHttpServiceName + ": Error getting a SingleItemResponse");
		if (!meaningfulError.stack) {
			// IE 11 won't generate a stack unless the error is thrown
			// https://docs.microsoft.com/en-us/scripting/javascript/reference/stack-property-error-javascript#remarks
			try {
				throw meaningfulError;
			} catch (error) {
				meaningfulError = error;
			}
		}

		return httpResponse$.pipe(
			map((result: HttpResponse<P>) => {
				const httpResponseHeaders: Map<string, string> = this.getResponseHeaders(result.headers);
				const resource: P = this.deserialize(<any>result.body, request, result);

				if (resource && result.headers.has(StarkHttpHeaders.ETAG)) {
					resource.etag = <any>result.headers.get(StarkHttpHeaders.ETAG);
				}

				return new StarkSingleItemResponseWrapperImpl<P>(result.status, httpResponseHeaders, resource);
			}),
			catchError((result: HttpErrorResponse) => {
				return this.createHttpErrorWrapper(result, meaningfulError);
			})
		);
	}

	// FIXME: re-enable this TSLINT rule and refactor this function to reduce its cognitive complexity
	// tslint:disable-next-line:cognitive-complexity
	private getCollectionResponseWrapperObservable(
		httpResponse$: Observable<HttpResponse<StarkHttpRawCollectionResponseData<P>>>,
		request: StarkHttpRequest<P>
	): Observable<StarkCollectionResponseWrapper<P>> {
		const retryCount: number = request.retryCount || 0;

		if (retryCount > 0) {
			httpResponse$ = this.addRetryLogic(httpResponse$, retryCount);
		}

		// The stack information in the Http Error (catchError) contains the execution statements of the http call.
		// That information is not useful for the developer.
		// To get a meaningful stack, a dummy meaningful error is created before the subscription to the webservice.
		// This meaningfulError is sent to the StarkHttpErrorWrapperImpl and contains all statements up to this method.
		let meaningfulError: Error = new Error(starkHttpServiceName + ": Error getting a CollectionResponse");
		if (!meaningfulError.stack) {
			// IE 11 won't generate a stack unless the error is thrown
			// https://docs.microsoft.com/en-us/scripting/javascript/reference/stack-property-error-javascript#remarks
			try {
				throw meaningfulError;
			} catch (error) {
				meaningfulError = error;
			}
		}

		return httpResponse$.pipe(
			map((result: HttpResponse<StarkHttpRawCollectionResponseData<P>>) => {
				const httpResponseHeaders: Map<string, string> = this.getResponseHeaders(result.headers);
				if ((<StarkHttpRawCollectionResponseData<P>>result.body).items instanceof Array) {
					if ((<StarkHttpRawCollectionResponseData<P>>result.body).metadata) {
						if ((<StarkHttpRawCollectionResponseData<P>>result.body).metadata.etags) {
							for (const item of (<StarkHttpRawCollectionResponseData<P>>result.body).items) {
								if (typeof item === "object") {
									if (item.uuid) {
										if ((<object>(<StarkHttpRawCollectionResponseData<P>>result.body).metadata.etags)[item.uuid]) {
											item.etag = (<object>(<StarkHttpRawCollectionResponseData<P>>result.body).metadata.etags)[
												item.uuid
											];
										} else {
											this.logger.warn(starkHttpServiceName + ": no etag found for resource with uuid ", item.uuid);
										}
									} else {
										this.logger.warn(starkHttpServiceName + ": no 'uuid' property found in item ", item);
									}
								} else {
									this.logger.warn(
										starkHttpServiceName +
											": cannot set the etag property in the item '" +
											item +
											"' because it is not an object"
									);
								}
							}
						} else {
							this.logger.warn(starkHttpServiceName + ": no 'etags' object found in the collection response metadata");
						}
					} else {
						this.logger.warn(starkHttpServiceName + ": no 'metadata' object found in the collection response");
					}
				} else {
					this.logger.warn(starkHttpServiceName + ": no 'items' array found in the collection response");
				}
				const items: object[] = (<StarkHttpRawCollectionResponseData<P>>result.body).items;
				return new StarkCollectionResponseWrapperImpl<P>(
					result.status,
					httpResponseHeaders,
					items instanceof Array ? items.map((item: object) => this.deserialize(item, request, result)) : items,
					Deserialize((<StarkHttpRawCollectionResponseData<P>>result.body).metadata, StarkCollectionMetadataImpl)
				);
			}),
			catchError((result: HttpErrorResponse) => {
				return this.createHttpErrorWrapper(result, meaningfulError);
			})
		);
	}

	private addRetryLogic<R>(httpResponse$: Observable<HttpResponse<R>>, retryCount: number): Observable<HttpResponse<R>> {
		return httpResponse$.pipe(
			retryWhen((errors: Observable<any>) => {
				let retries: number = 0;
				return errors.pipe(
					mergeMap((error: HttpResponse<P>) => {
						if (retries < retryCount) {
							retries++;
							return timer(this.retryDelay);
						} else {
							return throwError(error);
						}
					})
				);
			})
		);
	}

	private createHttpErrorWrapper(httpErrorResponse: HttpErrorResponse, meaningfulError: Error): Observable<never> {
		const httpResponseHeaders: Map<string, string> = this.getResponseHeaders(httpErrorResponse.headers);
		return throwError(new StarkHttpErrorWrapperImpl(httpErrorResponse, httpResponseHeaders, meaningfulError));
	}

	private serialize(entity: P, request: StarkHttpRequest<P>): string | object {
		return request.serializer.serialize(entity, request);
	}

	private deserialize(
		rawEntity: string | object,
		request: StarkHttpRequest<P>,
		response: HttpResponse<P | StarkHttpRawCollectionResponseData<P>>
	): P {
		return request.serializer.deserialize(rawEntity, request, response);
	}
}
