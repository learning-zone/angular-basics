/*tslint:disable:completed-docs*/
import createSpyObj = jasmine.createSpyObj;
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;
import { autoserialize, autoserializeAs, inheritSerialization, Serialize } from "cerialize";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";

import { StarkHttpServiceImpl } from "./http.service";
import {
	StarkBackend,
	StarkBackendImpl,
	StarkCollectionMetadata,
	StarkCollectionMetadataImpl,
	StarkCollectionResponseWrapper,
	StarkHttpError,
	StarkHttpErrorDetail,
	StarkHttpErrorDetailImpl,
	StarkHttpErrorImpl,
	StarkHttpErrorWrapper,
	StarkHttpRawCollectionResponseData,
	StarkHttpRequest,
	StarkHttpRequestType,
	StarkPaginationMetadata,
	StarkResource,
	StarkSingleItemMetadataImpl,
	StarkSingleItemResponseWrapper,
	StarkSortItem,
	StarkSortItemImpl
} from "../entities";

import { StarkHttpHeaders, StarkSortOrder } from "../constants";
import { StarkHttpStatusCodes } from "../enumerators";
import { StarkLoggingService } from "../../logging/services";
import { StarkSessionService } from "../../session/services";
import { MockStarkLoggingService } from "../../logging/testing";
import { MockStarkSessionService } from "../../session/testing";
import { StarkHttpSerializer, StarkHttpSerializerImpl } from "../serializer";

/* tslint:disable:no-big-function no-duplicate-string */
describe("Service: StarkHttpService", () => {
	let loggerMock: StarkLoggingService;
	let mockSessionService: StarkSessionService;
	let mockDevAuthHeaders: Map<string, string>;
	let httpMock: SpyObj<HttpClient>;
	let starkHttpService: HttpServiceHelper<MockResource>;
	let mockBackend: StarkBackend;
	let mockResourceWithEtag: MockResource;
	let mockResourceWithoutEtag: MockResource;
	let mockResourceWithMetadata: MockResource;
	const nextShouldNotBeCalled: string = "The 'next' function should not be called in case of an http error";
	const errorShouldNotBeCalled: string = "The 'error' function should not be called in case the http call succeeded";

	interface StarkHttpServiceSpecVariables {
		starkHttpService: HttpServiceHelper<MockResource>;
		httpMock: SpyObj<HttpClient>;
		loggerMock: StarkLoggingService;
		httpRequest: StarkHttpRequest<MockResource>;
	}

	/* MockResource */
	const mockUuid: string = "dfd45d31-1c78-4075-914e-9dd570f3eb31";
	const mockEtag: string = "0123456789";
	const mockProperty1: string = "Value1";
	const mockProperty2: string = "Value2";

	/* HTTP Headers */
	const contentTypeKey: string = StarkHttpHeaders.CONTENT_TYPE;
	const contentTypeValue: string = "application/json; charset=utf-8";
	const contentLengthKey: string = "Content-Length";
	const contentLengthValue: string = "10000";
	const expiresKey: string = "Expires";
	const expiresValue: string = "-1";

	const mockCorrelationId: string = "fooBarCorrelationIdentifier";
	const mockCorrelationIdHeaderName: string = "The-Correlation-Id";
	const mockCriteria: { [key: string]: any } = { field1: "anything", field2: "whatever" };

	const httpHeaders: { [name: string]: string } = {};
	httpHeaders[contentTypeKey] = contentTypeValue;
	httpHeaders[contentLengthKey] = contentLengthValue;
	httpHeaders[expiresKey] = expiresValue;

	/* HTTP Errors */
	const mockHttpErrorType: string = "https://api.demo.nbb.be/v1/errors/validation";
	const mockHttpErrorTitle: string = "Validation errors";
	const mockHttpErrorInstance: string = "4f4b3e6b-0707-4451-922f-53982ef83fdf";
	const mockHttpDetailErrorType: string = "https://api.demo.nbb.be/v1/errors/user-invalid";
	const mockHttpDetailErrorTitle: string = "Invalid user information";
	const mockHttpErrorDetail1: string = "The username is already in use";
	const mockHttpErrorDetail2: string = "The user's name is missing";
	const mockHttpErrorDetailField1: string = "firstname";
	const mockHttpErrorDetailField2: string = "lastname";
	const mockHttpErrorDetail3: string = "The e-mail is invalid";

	let headersMap: Map<string, string>;
	const dummyBackendUrl: string = "www.awesomeapi.com";
	const mockResourcePath: string = "mock";
	const mockResourceFullUrl: string = dummyBackendUrl + "/" + mockResourcePath;

	const mockHttpError: StarkHttpError = {
		type: mockHttpErrorType,
		title: mockHttpErrorTitle,
		titleKey: "errors.validation",
		instance: mockHttpErrorInstance,
		errors: [
			{
				type: mockHttpDetailErrorType,
				title: mockHttpDetailErrorTitle,
				titleKey: "errors.user.invalid",
				detail: mockHttpErrorDetail1,
				detailKey: "errors.user.invalid.username.already.in.use",
				fields: ["username"],
				instance: mockHttpErrorInstance
			},
			{
				type: mockHttpDetailErrorType,
				title: mockHttpDetailErrorTitle,
				titleKey: "errors.user.invalid",
				detail: mockHttpErrorDetail2,
				detailKey: "errors.user.invalid.username.missing",
				fields: [mockHttpErrorDetailField1, mockHttpErrorDetailField2],
				instance: mockHttpErrorInstance
			},
			{
				type: mockHttpDetailErrorType,
				title: mockHttpDetailErrorTitle,
				titleKey: "errors.user.invalid",
				detail: mockHttpErrorDetail3,
				detailKey: "errors.user.invalid.e-mail",
				fields: [" e-mail"],
				instance: mockHttpErrorInstance
			}
		]
	};

	const mockWarnings: StarkHttpErrorDetail[] = [...mockHttpError.errors];
	const mockResourceMetadata: MockResourceMetadata = {
		warnings: mockWarnings,
		someValue: "whatever"
	};
	const mockPaginationMetadata: StarkPaginationMetadata = {
		limit: 25,
		offset: 50,
		previousOffset: 25,
		nextOffset: 75,
		currentPage: 3,
		pageCount: 40,
		totalCount: 1000
	};

	interface HttpRequestOptions {
		params: {
			[param: string]: string | string[];
		};
		headers: {
			[header: string]: string | string[];
		};
		observe: "response";
		responseType: "json";
	}

	function assertHttpError(httpError: StarkHttpError, expectedError: StarkHttpError): void {
		expect(httpError instanceof StarkHttpErrorImpl).toBe(true);
		expect(httpError.errors).toBeDefined();
		expect(httpError.errors.length).toBe(expectedError.errors.length);

		httpError.errors.forEach((error: StarkHttpErrorDetail, index: number) => {
			expect(error instanceof StarkHttpErrorDetailImpl).toBe(true);
			expect(error.type).toBe(expectedError.errors[index].type);
			expect(error.title).toBe(expectedError.errors[index].title);
			expect(error.titleKey).toBe(expectedError.errors[index].titleKey);
			expect(error.titleKeyParameters).toEqual(expectedError.errors[index].titleKeyParameters);
			expect(error.instance).toBe(expectedError.errors[index].instance);
			if (typeof expectedError.errors[index].timestamp !== "undefined") {
				expect(error.timestamp).toBe(expectedError.errors[index].timestamp);
			} else {
				// the timestamp is auto generated in the constructor of the StarkErrorImpl class
				expect(error.timestamp).toBeDefined();
			}
			expect(error.metadata).toEqual(expectedError.errors[index].metadata);
			expect(error.detail).toBe(expectedError.errors[index].detail);
			expect(error.detailKey).toBe(expectedError.errors[index].detailKey);
			expect(error.detailKeyParameters).toEqual(expectedError.errors[index].detailKeyParameters);
			expect(error.fields).toEqual(expectedError.errors[index].fields);
			expect(error.status).toBe(expectedError.errors[index].status);
			expect(error.index).toBe(expectedError.errors[index].index);
		});
	}

	function assertResponseHeaders(responseHeaders: Map<string, string>, expectedHeaders: { [header: string]: string }): void {
		expect(responseHeaders.size).toBe(Object.keys(expectedHeaders).length);

		for (const header of Object.keys(expectedHeaders)) {
			expect(expectedHeaders[header]).toBeDefined();
			expect(responseHeaders.get(header)).toBe(expectedHeaders[header]);
		}
	}

	function assertCollectionMetadata(collectionMetadata: StarkCollectionMetadata, expectedMetadata: StarkCollectionMetadata): void {
		expect(collectionMetadata instanceof StarkCollectionMetadataImpl).toBe(true);

		if (expectedMetadata.sortedBy) {
			assertMetadataSorting(collectionMetadata.sortedBy, expectedMetadata.sortedBy);
		} else {
			expect(collectionMetadata.sortedBy).toBeUndefined();
		}
		if (expectedMetadata.pagination) {
			assertMetadataPagination(collectionMetadata.pagination, expectedMetadata.pagination);
		} else {
			expect(collectionMetadata.pagination).toBeUndefined();
		}
		if (expectedMetadata.warnings) {
			assertMetadataWarnings(<StarkHttpErrorDetail[]>collectionMetadata.warnings, expectedMetadata.warnings);
		} else {
			expect(collectionMetadata.warnings).toBeUndefined();
		}
		if (expectedMetadata.etags) {
			expect(collectionMetadata.etags).toEqual(expectedMetadata.etags);
		} else {
			expect(collectionMetadata.etags).toBeUndefined();
		}
		if (expectedMetadata.custom) {
			expect(collectionMetadata.custom).toEqual(expectedMetadata.custom);
		} else {
			expect(collectionMetadata.custom).toBeUndefined();
		}
	}

	function assertMetadataWarnings(metadataWarnings: StarkHttpErrorDetail[], expectedWarnings: StarkHttpErrorDetail[]): void {
		expect(metadataWarnings.length).toBe((<StarkHttpErrorDetail[]>mockResourceMetadata.warnings).length);

		metadataWarnings.forEach((warning: StarkHttpErrorDetail, index: number) => {
			expect(warning.type).toBe(expectedWarnings[index].type);
			expect(warning.title).toBe(expectedWarnings[index].title);
			expect(warning.titleKey).toBe(expectedWarnings[index].titleKey);
			expect(warning.detail).toBe(expectedWarnings[index].detail);
			expect(warning.detailKey).toBe(expectedWarnings[index].detailKey);
			expect(warning.fields).toEqual(expectedWarnings[index].fields);
			expect(warning.instance).toBe(expectedWarnings[index].instance);
		});
	}

	function assertMetadataPagination(metadataPagination: StarkPaginationMetadata, expectedPagination: StarkPaginationMetadata): void {
		expect(metadataPagination.currentPage).toBe(expectedPagination.currentPage);
		expect(metadataPagination.limit).toBe(expectedPagination.limit);
		expect(metadataPagination.offset).toBe(expectedPagination.offset);
		expect(metadataPagination.previousOffset).toBe(expectedPagination.previousOffset);
		expect(metadataPagination.nextOffset).toBe(expectedPagination.nextOffset);
		expect(metadataPagination.pageCount).toBe(expectedPagination.pageCount);
		expect(metadataPagination.totalCount).toBe(expectedPagination.totalCount);
	}

	function assertMetadataSorting(metadataSorting: StarkSortItem[], expectedSorting: StarkSortItem[]): void {
		expect(metadataSorting.length).toBe(expectedSorting.length);

		metadataSorting.forEach((sortItem: StarkSortItem, index: number) => {
			expect(sortItem instanceof StarkSortItemImpl).toBe(true);
			expect(sortItem.field).toBe(expectedSorting[index].field);
			expect(sortItem.order).toBe(expectedSorting[index].order);
			expect(sortItem.sortValue).toBe(expectedSorting[index].sortValue);
		});
	}

	function assertResponseData(responseData: MockResource[], expectedResponseData: MockResource[]): void {
		expect(responseData).toBeDefined();
		expect(responseData.length).toBe(expectedResponseData.length);

		responseData.forEach((collectionItem: MockResource, index: number) => {
			expect(collectionItem instanceof MockResource).toBe(true);
			expect(collectionItem.uuid).toBe(expectedResponseData[index].uuid);
			expect(collectionItem.property1).toBe(expectedResponseData[index].property1);
			expect(collectionItem.property2).toBe(expectedResponseData[index].property2);
			expect(collectionItem.etag).toBe(expectedResponseData[index].etag);
		});
	}

	function assertHttpFailure(errorWrapper: StarkHttpErrorWrapper): void {
		expect(errorWrapper).toBeDefined();
		assertHttpError(errorWrapper.httpError, mockHttpError);
		assertResponseHeaders(errorWrapper.starkHttpHeaders, httpHeaders);
	}

	function assertHttpCall(
		httpMethod: Spy,
		targetUrl: string,
		httpRequestConfig: HttpRequestOptions,
		serializedData?: string | object,
		attempts: number = 1
	): void {
		expect(httpMethod).toHaveBeenCalledTimes(attempts);
		if (serializedData) {
			expect(httpMethod).toHaveBeenCalledWith(targetUrl, serializedData, httpRequestConfig);
		} else {
			expect(httpMethod).toHaveBeenCalledWith(targetUrl, httpRequestConfig);
		}
	}

	function testHttpSuccess(
		requestType: "create" | "delete" | "getSingle" | "getCollection" | "search" | "update" | "updateIdempotent",
		beforeEachFn: () => StarkHttpServiceSpecVariables
	): void {
		describe("http success", () => {
			let request: StarkHttpRequest<MockResource>;
			let httpResponse: Partial<HttpResponse<StarkResource | StarkHttpRawCollectionResponseData<MockResource>>>;
			let httpClientMock: SpyObj<HttpClient>;
			let loggingServiceMock: StarkLoggingService;
			let httpService: HttpServiceHelper<MockResource>;
			let expectedStatusCode: number = StarkHttpStatusCodes.HTTP_200_OK;

			beforeEach(() => {
				({
					starkHttpService: httpService,
					httpMock: httpClientMock,
					loggerMock: loggingServiceMock,
					httpRequest: request
				} = beforeEachFn());

				httpResponse = {
					status: expectedStatusCode,
					body: mockResourceWithEtag,
					headers: httpHeadersGetter(httpHeaders)
				};
			});

			it("on SUCCESS ('" + requestType + "'), should wrap the returned data in an observable", () => {
				let resultObs: Observable<StarkSingleItemResponseWrapper<MockResource> | StarkCollectionResponseWrapper<MockResource>>;
				let httpMockMethod: Spy;
				let expectedSerializedData: string | object | undefined;
				let expectedEtags: { [uuid: string]: string };

				switch (requestType) {
					case "getSingle":
						httpMockMethod = httpClientMock.get;
						httpMockMethod.and.returnValue(of(httpResponse));

						resultObs = httpService.executeSingleItemRequest(request);
						break;
					case "delete":
						expectedStatusCode = StarkHttpStatusCodes.HTTP_204_NO_CONTENT;
						httpResponse = {
							status: expectedStatusCode,
							body: undefined,
							headers: httpHeadersGetter(httpHeaders)
						};
						httpMockMethod = httpClientMock.delete;
						httpMockMethod.and.returnValue(of(httpResponse));

						resultObs = httpService.executeSingleItemRequest(request);
						break;
					case "update":
						expectedStatusCode = StarkHttpStatusCodes.HTTP_204_NO_CONTENT;
						expectedSerializedData = request.serializer.serialize(mockResourceWithoutEtag);
						httpResponse = {
							status: expectedStatusCode,
							body: mockResourceWithEtag,
							headers: httpHeadersGetter(httpHeaders)
						};
						httpMockMethod = httpClientMock.post;
						httpMockMethod.and.returnValue(of(httpResponse));

						resultObs = httpService.executeSingleItemRequest(request);
						break;
					case "updateIdempotent":
						expectedStatusCode = StarkHttpStatusCodes.HTTP_204_NO_CONTENT;
						expectedSerializedData = request.serializer.serialize(mockResourceWithoutEtag);
						httpResponse = {
							status: expectedStatusCode,
							body: mockResourceWithEtag,
							headers: httpHeadersGetter(httpHeaders)
						};
						httpMockMethod = httpClientMock.put;
						httpMockMethod.and.returnValue(of(httpResponse));

						resultObs = httpService.executeSingleItemRequest(request);
						break;
					case "getCollection":
						expectedEtags = {};
						expectedEtags[mockUuid] = mockEtag;

						httpResponse = {
							status: expectedStatusCode,
							body: {
								items: [mockResourceWithoutEtag],
								metadata: {
									sortedBy: [
										{
											field: "name",
											order: StarkSortOrder.DESC
										}
									],
									pagination: mockPaginationMetadata,
									etags: expectedEtags,
									warnings: mockWarnings
								}
							},
							headers: httpHeadersGetter(httpHeaders)
						};
						httpMockMethod = httpClientMock.get;
						httpMockMethod.and.returnValue(of(httpResponse));

						resultObs = httpService.executeCollectionRequest(request);
						break;
					case "search":
						expectedSerializedData = Serialize(mockCriteria); // the search criteria is sent in the request body payload
						expectedEtags = {};
						expectedEtags[mockUuid] = mockEtag;

						httpResponse = {
							status: expectedStatusCode,
							body: {
								items: [mockResourceWithoutEtag],
								metadata: {
									sortedBy: [
										{
											field: "name",
											order: StarkSortOrder.DESC
										}
									],
									pagination: mockPaginationMetadata,
									etags: expectedEtags,
									warnings: mockWarnings
								}
							},
							headers: httpHeadersGetter(httpHeaders)
						};
						httpMockMethod = httpClientMock.post;
						httpMockMethod.and.returnValue(of(httpResponse));

						resultObs = httpService.executeCollectionRequest(request);
						break;
					default:
						// CREATE
						expectedSerializedData = request.serializer.serialize(mockResourceWithoutEtag);
						httpMockMethod = httpClientMock.post;
						httpMockMethod.and.returnValue(of(httpResponse));

						resultObs = httpService.executeSingleItemRequest(request);
						break;
				}

				resultObs.subscribe(
					(result: StarkSingleItemResponseWrapper<MockResource> | StarkCollectionResponseWrapper<MockResource>) => {
						expect(result).toBeDefined();
						expect(result.starkHttpStatusCode).toBe(expectedStatusCode);
						assertResponseHeaders(result.starkHttpHeaders, httpHeaders);

						// tslint:disable-next-line:prefer-switch
						if (requestType === "getCollection" || requestType === "search") {
							assertResponseData((<StarkCollectionResponseWrapper<MockResource>>result).data, [mockResourceWithEtag]);
							assertCollectionMetadata((<StarkCollectionResponseWrapper<MockResource>>result).metadata, {
								sortedBy: [
									{
										field: "name",
										order: StarkSortOrder.DESC,
										sortValue: "name" + "+" + StarkSortOrder.DESC
									}
								],
								pagination: mockPaginationMetadata,
								warnings: mockWarnings,
								etags: expectedEtags
							});
							expect(loggingServiceMock.warn).not.toHaveBeenCalled();
						} else if (requestType === "delete") {
							expect(result.data).toBeUndefined();
						} else {
							assertResponseData([(<StarkSingleItemResponseWrapper<MockResource>>result).data], [mockResourceWithEtag]);
							expect((<StarkSingleItemResponseWrapper<MockResource>>result).data.metadata).toBeUndefined();
						}

						assertHttpCall(
							httpMockMethod,
							mockResourceFullUrl,
							{
								params: convertMapIntoObject(request.queryParameters),
								headers: convertMapIntoObject(headersMap),
								observe: "response",
								responseType: "json"
							},
							expectedSerializedData
						);
					},
					() => {
						fail(errorShouldNotBeCalled);
					}
				);
			});
		});
	}

	function testHttpFailure(
		requestType: "create" | "delete" | "getSingle" | "getCollection" | "search" | "update" | "updateIdempotent",
		beforeEachFn: () => StarkHttpServiceSpecVariables
	): void {
		describe("http failure", () => {
			let request: StarkHttpRequest<MockResource>;
			let httpClientMock: SpyObj<HttpClient>;
			let loggingServiceMock: StarkLoggingService;
			let httpService: HttpServiceHelper<MockResource>;
			let resultObs: Observable<StarkSingleItemResponseWrapper<MockResource> | StarkCollectionResponseWrapper<MockResource>>;
			let httpErrorResponse: Partial<HttpErrorResponse>;

			beforeEach(() => {
				({
					starkHttpService: httpService,
					httpMock: httpClientMock,
					loggerMock: loggingServiceMock,
					httpRequest: request
				} = beforeEachFn());

				httpErrorResponse = {
					status: StarkHttpStatusCodes.HTTP_400_BAD_REQUEST,
					error: mockHttpError,
					headers: httpHeadersGetter(httpHeaders)
				};
			});

			it("on FAILURE ('" + requestType + "'), should wrap the returned data in an observable", () => {
				let httpMockMethod: Spy;
				let expectedSerializedData: string | object | undefined;

				switch (requestType) {
					case "getSingle":
						httpMockMethod = httpClientMock.get;
						httpMockMethod.and.returnValue(throwError(httpErrorResponse));

						resultObs = httpService.executeSingleItemRequest(request);
						break;
					case "delete":
						httpMockMethod = httpClientMock.delete;
						httpMockMethod.and.returnValue(throwError(httpErrorResponse));

						resultObs = httpService.executeSingleItemRequest(request);
						break;
					case "updateIdempotent":
						expectedSerializedData = request.serializer.serialize(mockResourceWithoutEtag);
						httpMockMethod = httpClientMock.put;
						httpMockMethod.and.returnValue(throwError(httpErrorResponse));

						resultObs = httpService.executeSingleItemRequest(request);
						break;
					case "getCollection":
						httpMockMethod = httpClientMock.get;
						httpMockMethod.and.returnValue(throwError(httpErrorResponse));

						resultObs = httpService.executeCollectionRequest(request);
						break;
					case "search":
						expectedSerializedData = Serialize(mockCriteria); // the search criteria is sent in the request body payload
						httpMockMethod = httpClientMock.post;
						httpMockMethod.and.returnValue(throwError(httpErrorResponse));

						resultObs = httpService.executeCollectionRequest(request);
						break;
					default:
						// CREATE | UPDATE
						expectedSerializedData = request.serializer.serialize(mockResourceWithoutEtag);
						httpMockMethod = httpClientMock.post;
						httpMockMethod.and.returnValue(throwError(httpErrorResponse));

						resultObs = httpService.executeSingleItemRequest(request);
						break;
				}

				resultObs.subscribe(
					() => {
						fail(nextShouldNotBeCalled);
					},
					(errorWrapper: StarkHttpErrorWrapper) => {
						assertHttpFailure(errorWrapper);
						assertHttpCall(
							httpMockMethod,
							mockResourceFullUrl,
							{
								params: convertMapIntoObject(request.queryParameters),
								headers: convertMapIntoObject(headersMap),
								observe: "response",
								responseType: "json"
							},
							expectedSerializedData
						);
					}
				);
			});

			// this test is asynchronous due to the retry logic, so the test should be ended manually by calling the jasmine's done() function
			it(
				"on FAILURE ('" +
					requestType +
					"'), should retry the request before emitting the failure if the request retryCount option is set",
				(done: DoneFn) => {
					request.retryCount = 2;
					let errorCounter: number = 0;
					const httpErrorResponse$: Observable<never> = throwError(httpErrorResponse).pipe(
						catchError((err: any) => {
							errorCounter++;
							return throwError(err);
						})
					);

					switch (requestType) {
						case "getSingle":
							httpClientMock.get.and.returnValue(httpErrorResponse$);

							resultObs = httpService.executeSingleItemRequest(request);
							break;
						case "delete":
							httpClientMock.delete.and.returnValue(httpErrorResponse$);

							resultObs = httpService.executeSingleItemRequest(request);
							break;
						case "updateIdempotent":
							httpClientMock.put.and.returnValue(httpErrorResponse$);

							resultObs = httpService.executeSingleItemRequest(request);
							break;
						case "getCollection":
							httpClientMock.get.and.returnValue(httpErrorResponse$);

							resultObs = httpService.executeCollectionRequest(request);
							break;
						case "search":
							httpClientMock.post.and.returnValue(httpErrorResponse$);

							resultObs = httpService.executeCollectionRequest(request);
							break;
						default:
							// CREATE | UPDATE
							httpClientMock.post.and.returnValue(httpErrorResponse$);

							resultObs = httpService.executeSingleItemRequest(request);
							break;
					}

					resultObs.subscribe(
						() => {
							fail(nextShouldNotBeCalled);
						},
						(errorWrapper: StarkHttpErrorWrapper) => {
							assertHttpFailure(errorWrapper);
							expect(errorCounter).toBe(1 + <number>request.retryCount); // error in original request + number of retries
							done();
						}
					);
				}
			);
		});
	}

	function testSingleItemResponseMetadata(
		requestType: "create" | "getSingle" | "update" | "updateIdempotent",
		beforeEachFn: () => StarkHttpServiceSpecVariables
	): void {
		describe("single item response metadata", () => {
			let request: StarkHttpRequest<MockResource>;
			let httpResponse: Partial<HttpResponse<StarkResource>>;
			let httpClientMock: SpyObj<HttpClient>;
			let loggingServiceMock: StarkLoggingService;
			let httpService: HttpServiceHelper<MockResource>;

			beforeEach(() => {
				({
					starkHttpService: httpService,
					httpMock: httpClientMock,
					loggerMock: loggingServiceMock,
					httpRequest: request
				} = beforeEachFn());
			});

			it(
				"on SUCCESS ('" + requestType + "'), should return the data including metadata (if any) and wrap it in an observable",
				() => {
					let expectedStatusCode: number = StarkHttpStatusCodes.HTTP_200_OK;

					switch (requestType) {
						case "getSingle":
							httpResponse = {
								status: expectedStatusCode,
								body: mockResourceWithMetadata,
								headers: httpHeadersGetter(httpHeaders)
							};
							httpClientMock.get.and.returnValue(of(httpResponse));
							break;
						case "update":
							expectedStatusCode = StarkHttpStatusCodes.HTTP_204_NO_CONTENT;
							httpResponse = {
								status: expectedStatusCode,
								body: mockResourceWithMetadata,
								headers: httpHeadersGetter(httpHeaders)
							};
							httpClientMock.post.and.returnValue(of(httpResponse));
							break;
						case "updateIdempotent":
							expectedStatusCode = StarkHttpStatusCodes.HTTP_204_NO_CONTENT;
							httpResponse = {
								status: expectedStatusCode,
								body: mockResourceWithMetadata,
								headers: httpHeadersGetter(httpHeaders)
							};
							httpClientMock.put.and.returnValue(of(httpResponse));
							break;
						default:
							// CREATE
							httpResponse = {
								status: expectedStatusCode,
								body: mockResourceWithMetadata,
								headers: httpHeadersGetter(httpHeaders)
							};
							httpClientMock.post.and.returnValue(of(httpResponse));
							break;
					}

					const resultObs: Observable<StarkSingleItemResponseWrapper<MockResource>> = httpService.executeSingleItemRequest(
						request
					);

					resultObs.subscribe(
						(result: StarkSingleItemResponseWrapper<MockResource>) => {
							expect(result).toBeDefined();
							expect(result.starkHttpStatusCode).toBe(expectedStatusCode);
							assertResponseHeaders(result.starkHttpHeaders, httpHeaders);
							assertResponseData([result.data], [mockResourceWithEtag]);
							expect(result.data.metadata instanceof MockResourceMetadata).toBe(true);
							assertMetadataWarnings(<StarkHttpErrorDetail[]>result.data.metadata.warnings, mockWarnings);
							expect(result.data.metadata.someValue).toBe(mockResourceMetadata.someValue);
						},
						() => {
							fail(errorShouldNotBeCalled);
						}
					);
				}
			);
		});
	}

	function testCollectionResponseValidations(
		requestType: "getCollection" | "search",
		beforeEachFn: () => StarkHttpServiceSpecVariables
	): void {
		describe("collection response validations", () => {
			let request: StarkHttpRequest<MockResource>;
			let httpClientMock: SpyObj<HttpClient>;
			let httpMockMethod: Spy;
			let loggingServiceMock: StarkLoggingService;
			let httpService: HttpServiceHelper<MockResource>;
			let resultObs: Observable<StarkCollectionResponseWrapper<MockResource>>;
			const mockCustomMetadata: object = {
				prop1: 1234,
				prop2: "whatever",
				prop3: "2016-03-18T18:25:43.511Z",
				prop4: [
					"some custom value",
					"false",
					"null",
					"",
					true,
					false,
					0,
					{
						name: "Christopher",
						surname: "Cortes"
					}
				]
			};

			beforeEach(() => {
				({
					starkHttpService: httpService,
					httpMock: httpClientMock,
					loggerMock: loggingServiceMock,
					httpRequest: request
				} = beforeEachFn());

				if (requestType === "getCollection") {
					httpMockMethod = httpClientMock.get;
				} else {
					// SEARCH
					httpMockMethod = httpClientMock.post;
				}
			});

			it("on SUCCESS ('" + requestType + "'), should log a warning in case the response metadata contains no 'etags' object", () => {
				const expectedStatusCode: number = StarkHttpStatusCodes.HTTP_200_OK;

				const httpResponse: Partial<HttpResponse<StarkHttpRawCollectionResponseData<MockResource>>> = {
					status: expectedStatusCode,
					body: {
						items: [mockResourceWithoutEtag],
						metadata: {
							sortedBy: [],
							pagination: mockPaginationMetadata,
							etags: <any>undefined
						}
					},
					headers: httpHeadersGetter(httpHeaders)
				};

				httpMockMethod.and.returnValue(of(httpResponse));

				resultObs = httpService.executeCollectionRequest(request);

				resultObs.subscribe(
					(result: StarkCollectionResponseWrapper<MockResource>) => {
						expect(result).toBeDefined();
						expect(result.starkHttpStatusCode).toBe(expectedStatusCode);
						assertResponseHeaders(result.starkHttpHeaders, httpHeaders);
						assertResponseData(result.data, [mockResourceWithoutEtag]);
						assertCollectionMetadata(result.metadata, {
							sortedBy: [],
							pagination: mockPaginationMetadata
						});
						expect(loggingServiceMock.warn).toHaveBeenCalledTimes(1);
						expect((<Spy>loggingServiceMock.warn).calls.argsFor(0)[0]).toContain("no 'etags'");
					},
					() => {
						fail(errorShouldNotBeCalled);
					}
				);
			});

			it(
				"on SUCCESS ('" +
					requestType +
					"'), should log a warning in case there is no etag for a certain resource in the response metadata",
				() => {
					const expectedStatusCode: number = StarkHttpStatusCodes.HTTP_200_OK;
					const expectedEtags: { [uuid: string]: string } = {};

					const httpResponse: Partial<HttpResponse<StarkHttpRawCollectionResponseData<MockResource>>> = {
						status: expectedStatusCode,
						body: {
							items: [mockResourceWithoutEtag],
							metadata: {
								sortedBy: [],
								pagination: mockPaginationMetadata,
								etags: expectedEtags
							}
						},
						headers: httpHeadersGetter(httpHeaders)
					};

					httpMockMethod.and.returnValue(of(httpResponse));

					resultObs = httpService.executeCollectionRequest(request);

					resultObs.subscribe(
						(result: StarkCollectionResponseWrapper<MockResource>) => {
							expect(result).toBeDefined();
							expect(result.starkHttpStatusCode).toBe(expectedStatusCode);
							assertResponseData(result.data, [mockResourceWithoutEtag]);
							assertCollectionMetadata(result.metadata, {
								sortedBy: [],
								pagination: mockPaginationMetadata,
								etags: expectedEtags
							});
							assertResponseHeaders(result.starkHttpHeaders, httpHeaders);
							expect(loggingServiceMock.warn).toHaveBeenCalledTimes(1);
							expect((<Spy>loggingServiceMock.warn).calls.argsFor(0)[0]).toContain("no etag");
						},
						() => {
							fail(errorShouldNotBeCalled);
						}
					);
				}
			);

			it("on SUCCESS ('" + requestType + "'), should log a warning in case the response contains an invalid items array", () => {
				const expectedStatusCode: number = StarkHttpStatusCodes.HTTP_200_OK;
				const expectedEtags: { [uuid: string]: string } = {};
				expectedEtags[mockUuid] = mockEtag;

				const items: any = {}; // invalid "items" array

				const httpResponse: Partial<HttpResponse<StarkHttpRawCollectionResponseData<MockResource>>> = {
					status: expectedStatusCode,
					body: {
						items: items,
						metadata: {
							sortedBy: [],
							pagination: mockPaginationMetadata,
							etags: expectedEtags
						}
					},
					headers: httpHeadersGetter(httpHeaders)
				};

				httpMockMethod.and.returnValue(of(httpResponse));

				resultObs = httpService.executeCollectionRequest(request);

				resultObs.subscribe(
					(result: StarkCollectionResponseWrapper<MockResource>) => {
						expect(result).toBeDefined();
						expect(result.starkHttpStatusCode).toBe(expectedStatusCode);
						expect(result.data).toBeDefined(); // the data is whatever it comes in the "items" property
						assertCollectionMetadata(result.metadata, {
							sortedBy: [],
							pagination: mockPaginationMetadata,
							etags: expectedEtags
						});
						assertResponseHeaders(result.starkHttpHeaders, httpHeaders);
						expect(loggingServiceMock.warn).toHaveBeenCalledTimes(1);
						expect((<Spy>loggingServiceMock.warn).calls.argsFor(0)[0]).toContain("no 'items'");
					},
					() => {
						fail(errorShouldNotBeCalled);
					}
				);
			});

			it(
				"on SUCCESS ('" +
					requestType +
					"'), should log a warning in case an item in the items array is not an object so the etag property cannot be set",
				() => {
					const expectedStatusCode: number = StarkHttpStatusCodes.HTTP_200_OK;
					const expectedEtags: { [uuid: string]: string } = {};
					expectedEtags[mockUuid] = mockEtag;

					const items: any[] = [
						// non-object item in "items" array
						"non-object value"
					];

					const httpResponse: Partial<HttpResponse<StarkHttpRawCollectionResponseData<MockResource>>> = {
						status: expectedStatusCode,
						body: {
							items: items,
							metadata: {
								sortedBy: [],
								pagination: mockPaginationMetadata,
								etags: expectedEtags
							}
						},
						headers: httpHeadersGetter(httpHeaders)
					};

					httpMockMethod.and.returnValue(of(httpResponse));

					resultObs = httpService.executeCollectionRequest(request);

					resultObs.subscribe(
						(result: StarkCollectionResponseWrapper<any>) => {
							expect(result).toBeDefined();
							expect(result.starkHttpStatusCode).toBe(expectedStatusCode);
							expect(result.data).toBeDefined();
							expect(result.data.length).toBe(1);
							expect(result.data[0] instanceof MockResource).toBe(false);
							expect(result.data[0]).toBe(items[0]);
							assertCollectionMetadata(result.metadata, {
								sortedBy: [],
								pagination: mockPaginationMetadata,
								etags: expectedEtags
							});
							assertResponseHeaders(result.starkHttpHeaders, httpHeaders);
							expect(loggingServiceMock.warn).toHaveBeenCalledTimes(1);
							expect((<Spy>loggingServiceMock.warn).calls.argsFor(0)[0]).toContain("it is not an object");
						},
						() => {
							fail(errorShouldNotBeCalled);
						}
					);
				}
			);

			it(
				"on SUCCESS ('" +
					requestType +
					"'), should log a warning in case an item in the items array has no uuid so it cannot search the correct etag for it",
				() => {
					const expectedStatusCode: number = StarkHttpStatusCodes.HTTP_200_OK;
					const expectedEtags: { [uuid: string]: string } = {};
					expectedEtags[mockUuid] = mockEtag;

					const mockResourceWithoutUuid: MockResource = { ...mockResourceWithEtag };
					delete mockResourceWithoutUuid.uuid;

					const httpResponse: Partial<HttpResponse<StarkHttpRawCollectionResponseData<MockResource>>> = {
						status: expectedStatusCode,
						body: {
							items: [mockResourceWithoutUuid],
							metadata: {
								sortedBy: [],
								pagination: mockPaginationMetadata,
								etags: expectedEtags
							}
						},
						headers: httpHeadersGetter(httpHeaders)
					};

					httpMockMethod.and.returnValue(of(httpResponse));

					resultObs = httpService.executeCollectionRequest(request);

					resultObs.subscribe(
						(result: StarkCollectionResponseWrapper<MockResource>) => {
							expect(result).toBeDefined();
							expect(result.starkHttpStatusCode).toBe(expectedStatusCode);
							assertResponseData(result.data, [mockResourceWithoutUuid]); // should contain the etag now
							assertCollectionMetadata(result.metadata, {
								sortedBy: [],
								pagination: mockPaginationMetadata,
								etags: expectedEtags
							});
							assertResponseHeaders(result.starkHttpHeaders, httpHeaders);
							expect(loggingServiceMock.warn).toHaveBeenCalledTimes(1);
							expect((<Spy>loggingServiceMock.warn).calls.argsFor(0)[0]).toContain("no 'uuid' property found in item");
						},
						() => {
							fail(errorShouldNotBeCalled);
						}
					);
				}
			);

			it("on SUCCESS ('" + requestType + "'), should log a warning in case the response contains no metadata object", () => {
				const expectedStatusCode: number = StarkHttpStatusCodes.HTTP_200_OK;

				const httpResponse: Partial<HttpResponse<StarkHttpRawCollectionResponseData<MockResource>>> = {
					status: expectedStatusCode,
					body: {
						items: [mockResourceWithoutEtag],
						metadata: <any>undefined
					},
					headers: httpHeadersGetter(httpHeaders)
				};

				httpMockMethod.and.returnValue(of(httpResponse));

				resultObs = httpService.executeCollectionRequest(request);

				resultObs.subscribe(
					(result: StarkCollectionResponseWrapper<MockResource>) => {
						expect(result).toBeDefined();
						expect(result.starkHttpStatusCode).toBe(expectedStatusCode);
						assertResponseData(result.data, [mockResourceWithoutEtag]);
						expect(result.metadata).toBeUndefined();
						assertResponseHeaders(result.starkHttpHeaders, httpHeaders);
						expect(loggingServiceMock.warn).toHaveBeenCalledTimes(1);
						expect((<Spy>loggingServiceMock.warn).calls.argsFor(0)[0]).toContain("no 'metadata'");
					},
					() => {
						fail(errorShouldNotBeCalled);
					}
				);
			});

			it(
				"on SUCCESS ('" +
					requestType +
					"'), should deserialize 'as is' the custom metadata if any is returned in the response metadata",
				() => {
					const expectedStatusCode: number = StarkHttpStatusCodes.HTTP_200_OK;
					const expectedEtags: { [uuid: string]: string } = {};
					expectedEtags[mockUuid] = mockEtag;

					const httpResponse: Partial<HttpResponse<StarkHttpRawCollectionResponseData<MockResource>>> = {
						status: expectedStatusCode,
						body: {
							items: [mockResourceWithoutEtag],
							metadata: {
								sortedBy: [],
								pagination: mockPaginationMetadata,
								etags: expectedEtags,
								custom: mockCustomMetadata
							}
						},
						headers: httpHeadersGetter(httpHeaders)
					};

					httpMockMethod.and.returnValue(of(httpResponse));

					resultObs = httpService.executeCollectionRequest(request);

					resultObs.subscribe(
						(result: StarkCollectionResponseWrapper<MockResource>) => {
							expect(result).toBeDefined();
							expect(result.starkHttpStatusCode).toBe(expectedStatusCode);
							assertResponseHeaders(result.starkHttpHeaders, httpHeaders);
							assertResponseData(result.data, [mockResourceWithEtag]); // should contain the etag now
							assertCollectionMetadata(result.metadata, {
								sortedBy: [],
								pagination: mockPaginationMetadata,
								etags: expectedEtags,
								custom: mockCustomMetadata
							});
							expect(loggingServiceMock.warn).not.toHaveBeenCalled();
						},
						() => {
							fail(errorShouldNotBeCalled);
						}
					);
				}
			);
		});
	}

	function testEtagRemoval(_requestType: "create" | "update", beforeEachFn: () => StarkHttpServiceSpecVariables): void {
		describe("on etag removal", () => {
			let request: StarkHttpRequest<MockResource>;
			let httpClientMock: SpyObj<HttpClient>;
			let loggingServiceMock: StarkLoggingService;
			let httpService: HttpServiceHelper<MockResource>;
			let httpResponse: Partial<HttpResponse<StarkResource>>;

			beforeEach(() => {
				({
					starkHttpService: httpService,
					httpMock: httpClientMock,
					loggerMock: loggingServiceMock,
					httpRequest: request
				} = beforeEachFn());

				httpResponse = {
					status: StarkHttpStatusCodes.HTTP_204_NO_CONTENT,
					body: mockResourceWithEtag,
					headers: httpHeadersGetter(httpHeaders)
				};
			});

			it("should remove the etag from the entity before serializing it", () => {
				httpClientMock.post.and.returnValue(of(httpResponse));

				const resultObs: Observable<StarkSingleItemResponseWrapper<MockResource>> = httpService.executeSingleItemRequest(request);

				resultObs.subscribe((result: StarkSingleItemResponseWrapper<MockResource>) => {
					expect(result).toBeDefined();
				});

				assertHttpCall(
					httpClientMock.post,
					mockResourceFullUrl,
					{
						params: convertMapIntoObject(request.queryParameters),
						headers: convertMapIntoObject(headersMap),
						observe: "response",
						responseType: "json"
					},
					request.serializer.serialize(mockResourceWithoutEtag) // etag is removed from the item sent due to NG-1361
				);
			});
		});
	}

	beforeEach(() => {
		mockBackend = new StarkBackendImpl();
		mockBackend.url = dummyBackendUrl;
		mockResourceWithoutEtag = new MockResource(mockUuid);
		mockResourceWithoutEtag.property1 = mockProperty1;
		mockResourceWithoutEtag.property2 = mockProperty2;
		mockResourceWithEtag = { ...mockResourceWithoutEtag, etag: mockEtag };
		mockResourceWithMetadata = {
			...mockResourceWithoutEtag,
			etag: mockEtag,
			metadata: mockResourceMetadata
		};
		// Make sure that a correlation identifier is defined correctly on the logger
		loggerMock = new MockStarkLoggingService(mockCorrelationId, mockCorrelationIdHeaderName);

		mockDevAuthHeaders = new Map<string, string>();
		mockDevAuthHeaders.set(mockCorrelationIdHeaderName, mockCorrelationId);
		mockDevAuthHeaders.set("username", "DOEJOHN");
		mockDevAuthHeaders.set("firstname", "John");
		mockDevAuthHeaders.set("lastname", "Doe");
		mockSessionService = new MockStarkSessionService(mockDevAuthHeaders);

		httpMock = createSpyObj<HttpClient>("HttpClient", ["get", "put", "post", "delete"]);

		starkHttpService = new HttpServiceHelper<MockResource>(loggerMock, mockSessionService, httpMock);
		starkHttpService.retryDelay = 10; // override retry delay to make unit tests faster

		headersMap = new Map<string, string>();
		// Assume that the correlation-id header will always be set
		headersMap.set(mockCorrelationIdHeaderName, mockCorrelationId);
	});

	describe("executeSingleItemRequest", () => {
		describe("with a Get request", () => {
			function beforeEachFn(): StarkHttpServiceSpecVariables {
				const request: StarkHttpRequest<MockResource> = {
					backend: mockBackend,
					resourcePath: mockResourcePath,
					headers: new Map<string, string>(),
					queryParameters: new Map<string, string>(),
					requestType: StarkHttpRequestType.GET,
					item: undefined,
					serializer: mockResourceSerializer
				};
				request.queryParameters.set("duplicatedParam", ["paramValue1", "paramValue2"]);

				return {
					loggerMock: loggerMock,
					httpMock: httpMock,
					starkHttpService: starkHttpService,
					httpRequest: request
				};
			}

			testHttpSuccess("getSingle", beforeEachFn);

			testHttpFailure("getSingle", beforeEachFn);

			testSingleItemResponseMetadata("getSingle", beforeEachFn);
		});

		describe("with a Delete request", () => {
			function beforeEachFn(): StarkHttpServiceSpecVariables {
				const request: StarkHttpRequest<MockResource> = {
					backend: mockBackend,
					resourcePath: mockResourcePath,
					headers: new Map<string, string>(),
					queryParameters: new Map<string, string>(),
					requestType: StarkHttpRequestType.DELETE,
					item: mockResourceWithEtag,
					serializer: mockResourceSerializer
				};
				request.queryParameters.set("duplicatedParam", ["paramValue1", "paramValue2"]);

				return {
					loggerMock: loggerMock,
					httpMock: httpMock,
					starkHttpService: starkHttpService,
					httpRequest: request
				};
			}

			testHttpSuccess("delete", beforeEachFn);

			testHttpFailure("delete", beforeEachFn);
		});

		describe("with an Update request", () => {
			function beforeEachFn(): StarkHttpServiceSpecVariables {
				const request: StarkHttpRequest<MockResource> = {
					backend: mockBackend,
					resourcePath: mockResourcePath,
					headers: new Map<string, string>(),
					queryParameters: new Map<string, string>(),
					requestType: StarkHttpRequestType.UPDATE,
					item: mockResourceWithEtag,
					serializer: mockResourceSerializer
				};
				request.queryParameters.set("duplicatedParam", ["paramValue1", "paramValue2"]);

				return {
					loggerMock: loggerMock,
					httpMock: httpMock,
					starkHttpService: starkHttpService,
					httpRequest: request
				};
			}

			testHttpSuccess("update", beforeEachFn);

			testHttpFailure("update", beforeEachFn);

			testEtagRemoval("update", beforeEachFn);

			testSingleItemResponseMetadata("update", beforeEachFn);
		});

		describe("with an Update Idempotent request", () => {
			function beforeEachFn(): StarkHttpServiceSpecVariables {
				const request: StarkHttpRequest<MockResource> = {
					backend: mockBackend,
					resourcePath: mockResourcePath,
					headers: new Map<string, string>(),
					queryParameters: new Map<string, string>(),
					requestType: StarkHttpRequestType.UPDATE_IDEMPOTENT,
					item: mockResourceWithEtag,
					serializer: mockResourceSerializer
				};
				request.queryParameters.set("duplicatedParam", ["paramValue1", "paramValue2"]);

				return {
					loggerMock: loggerMock,
					httpMock: httpMock,
					starkHttpService: starkHttpService,
					httpRequest: request
				};
			}

			testHttpSuccess("updateIdempotent", beforeEachFn);

			testHttpFailure("updateIdempotent", beforeEachFn);

			testSingleItemResponseMetadata("updateIdempotent", beforeEachFn);
		});

		describe("with a Create request", () => {
			function beforeEachFn(): StarkHttpServiceSpecVariables {
				const request: StarkHttpRequest<MockResource> = {
					backend: mockBackend,
					resourcePath: mockResourcePath,
					headers: new Map<string, string>(),
					queryParameters: new Map<string, string>(),
					requestType: StarkHttpRequestType.CREATE,
					item: mockResourceWithEtag,
					serializer: mockResourceSerializer
				};
				request.queryParameters.set("duplicatedParam", ["paramValue1", "paramValue2"]);

				return {
					loggerMock: loggerMock,
					httpMock: httpMock,
					starkHttpService: starkHttpService,
					httpRequest: request
				};
			}

			testHttpSuccess("create", beforeEachFn);

			testHttpFailure("create", beforeEachFn);

			testEtagRemoval("create", beforeEachFn);

			testSingleItemResponseMetadata("create", beforeEachFn);
		});

		describe("with an unknown request type", () => {
			it("should throw an error", () => {
				const request: StarkHttpRequest<MockResource> = {
					backend: mockBackend,
					resourcePath: mockResourcePath,
					headers: new Map<string, string>(),
					queryParameters: new Map<string, string>(),
					requestType: StarkHttpRequestType.GET_COLLECTION,
					item: mockResourceWithoutEtag,
					serializer: mockResourceSerializer
				};

				starkHttpService.executeSingleItemRequest(request).subscribe(
					() => {
						fail("The 'next' function should not be called in case of error");
					},
					(error: string) => {
						expect(error).toContain("Unknown request type");
					},
					() => {
						fail("The 'complete' function should not be called in case of error");
					}
				);
			});
		});
	});

	describe("executeCollectionRequest", () => {
		describe("with a GetCollection request", () => {
			function beforeEachFn(): StarkHttpServiceSpecVariables {
				const request: StarkHttpRequest<MockResource> = {
					backend: mockBackend,
					resourcePath: mockResourcePath,
					headers: new Map<string, string>(),
					queryParameters: new Map<string, string>(),
					requestType: StarkHttpRequestType.GET_COLLECTION,
					item: undefined,
					serializer: mockResourceSerializer
				};
				request.queryParameters.set("duplicatedParam", ["paramValue1", "paramValue2"]);

				return {
					loggerMock: loggerMock,
					httpMock: httpMock,
					starkHttpService: starkHttpService,
					httpRequest: request
				};
			}

			testHttpSuccess("getCollection", beforeEachFn);

			testHttpFailure("getCollection", beforeEachFn);

			testCollectionResponseValidations("getCollection", beforeEachFn);
		});

		describe("with a Search request", () => {
			function beforeEachFn(): StarkHttpServiceSpecVariables {
				const request: StarkHttpRequest<MockResource> = {
					backend: mockBackend,
					resourcePath: mockResourcePath,
					headers: new Map<string, string>(),
					queryParameters: new Map<string, string>(),
					requestType: StarkHttpRequestType.SEARCH,
					item: mockCriteria,
					serializer: mockResourceSerializer
				};
				request.queryParameters.set("duplicatedParam", ["paramValue1", "paramValue2"]);

				return {
					loggerMock: loggerMock,
					httpMock: httpMock,
					starkHttpService: starkHttpService,
					httpRequest: request
				};
			}

			testHttpSuccess("search", beforeEachFn);

			testHttpFailure("search", beforeEachFn);

			testCollectionResponseValidations("search", beforeEachFn);
		});

		describe("with an unknown request type", () => {
			it("should throw an error", () => {
				const request: StarkHttpRequest<MockResource> = {
					backend: mockBackend,
					resourcePath: mockResourcePath,
					headers: new Map<string, string>(),
					queryParameters: new Map<string, string>(),
					requestType: StarkHttpRequestType.CREATE,
					item: undefined,
					serializer: mockResourceSerializer
				};

				starkHttpService.executeSingleItemRequest(request).subscribe(
					() => {
						fail("The 'next' function should not be called in case of error");
					},
					(error: string) => {
						expect(error).toContain("Unknown request type");
					},
					() => {
						fail("The 'complete' function should not be called in case of error");
					}
				);
			});
		});
	});

	describe("rawHttpClient", () => {
		it("should return the Angular core http client", () => {
			expect(starkHttpService.rawHttpClient).toBe(httpMock);
		});
	});

	describe("addDevAuthenticationHeaders", () => {
		it("should get the authentication headers from the Session service and add them to the current request headers", () => {
			const dummyHeaderName: string = "some header";
			const dummyHeaderValue: string = "some value";
			const request: StarkHttpRequest<MockResource> = {
				backend: mockBackend,
				resourcePath: mockResourcePath,
				headers: new Map<string, string>(),
				queryParameters: new Map<string, string>(),
				requestType: StarkHttpRequestType.DELETE,
				item: mockResourceWithEtag,
				serializer: mockResourceSerializer
			};
			request.headers.set(dummyHeaderName, dummyHeaderValue);

			const devAuthenticationHeaders: Map<string, string> = mockSessionService.devAuthenticationHeaders;
			expect(devAuthenticationHeaders.size).toBe(mockDevAuthHeaders.size);

			const requestWithDevAuthHeaders: StarkHttpRequest = starkHttpService.addDevAuthenticationHeaders(request);

			expect(requestWithDevAuthHeaders.headers.size).toBe(devAuthenticationHeaders.size + 1); // plus the custom header
			expect(requestWithDevAuthHeaders.headers.has(dummyHeaderName)).toBe(true);
			expect(requestWithDevAuthHeaders.headers.get(dummyHeaderName)).toBe(dummyHeaderValue);

			devAuthenticationHeaders.forEach((headerValue: string, header: string) => {
				expect(requestWithDevAuthHeaders.headers.has(header)).toBe(true);
				expect(requestWithDevAuthHeaders.headers.get(header)).toBe(headerValue);
			});
		});
	});

	describe("addCorrelationIdentifierHeader", () => {
		it("should get the correlationId from the Logging service and add it as a header to the current request headers", () => {
			const dummyHeaderName: string = "some header";
			const dummyHeaderValue: string = "some value";
			const request: StarkHttpRequest<MockResource> = {
				backend: mockBackend,
				resourcePath: mockResourcePath,
				headers: new Map<string, string>(),
				queryParameters: new Map<string, string>(),
				requestType: StarkHttpRequestType.DELETE,
				item: mockResourceWithEtag,
				serializer: mockResourceSerializer
			};
			request.headers.set(dummyHeaderName, dummyHeaderValue);

			const correlationId: string = loggerMock.correlationId;
			expect(correlationId).toBe(mockCorrelationId);

			const requestWithCorrelationIdHeader: StarkHttpRequest<MockResource> = starkHttpService.addCorrelationIdentifierHeader(request);

			expect(requestWithCorrelationIdHeader.headers.size).toBe(2); // plus the custom header
			expect(requestWithCorrelationIdHeader.headers.has(dummyHeaderName)).toBe(true);
			expect(requestWithCorrelationIdHeader.headers.get(dummyHeaderName)).toBe(dummyHeaderValue);
			expect(requestWithCorrelationIdHeader.headers.has(loggerMock.correlationIdHttpHeaderName)).toBe(true);
			expect(requestWithCorrelationIdHeader.headers.get(loggerMock.correlationIdHttpHeaderName)).toBe(correlationId);
		});
	});
});

@inheritSerialization(StarkSingleItemMetadataImpl)
class MockResourceMetadata extends StarkSingleItemMetadataImpl {
	@autoserialize
	public someValue?: string;
}

class MockResource implements StarkResource {
	@autoserialize
	public uuid: string;

	@autoserialize
	public etag: string;

	@autoserializeAs(MockResourceMetadata)
	public metadata: MockResourceMetadata;

	@autoserialize
	public property1: string;

	@autoserialize
	public property2: string;

	public constructor(uuid: string) {
		this.uuid = uuid;
	}
}

const mockResourceSerializer: StarkHttpSerializer<MockResource> = new StarkHttpSerializerImpl<MockResource>(MockResource);

function httpHeadersGetter(inputHeaders: { [name: string]: string }): HttpHeaders {
	return new HttpHeaders(inputHeaders);
}

function convertMapIntoObject(map: Map<string, any>): { [param: string]: any } {
	const resultObj: object = {};

	map.forEach((value: any, key: string) => {
		resultObj[key] = value;
	});

	return resultObj;
}

class HttpServiceHelper<P extends StarkResource> extends StarkHttpServiceImpl<P> {
	public retryDelay: number;

	public constructor(logger: StarkLoggingService, sessionService: StarkSessionService, $http: HttpClient) {
		super(logger, sessionService, $http);
	}

	public addDevAuthenticationHeaders(request: StarkHttpRequest<P>): StarkHttpRequest<P> {
		return super.addDevAuthenticationHeaders(request);
	}

	public addCorrelationIdentifierHeader(request: StarkHttpRequest<P>): StarkHttpRequest<P> {
		return super.addCorrelationIdentifierHeader(request);
	}
}

/* tslint:enable */
