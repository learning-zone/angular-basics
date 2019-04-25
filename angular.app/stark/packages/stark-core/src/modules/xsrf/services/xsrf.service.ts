/* tslint:disable:completed-docs*/
import { Inject, Injectable, Injector } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from "@angular/common/http";
import moment from "moment";
import { Observable, of, from } from "rxjs";
import { take } from "rxjs/operators";
import { StarkXSRFService, starkXSRFServiceName } from "./xsrf.service.intf";
import { STARK_XSRF_CONFIG, StarkXSRFConfig } from "./xsrf-config.intf";
import { StarkHttpHeaders } from "../../http/constants";
import { StarkHttpStatusCodes } from "../../http/enumerators";
import { STARK_APP_CONFIG, StarkApplicationConfig } from "../../../configuration/entities";
import { StarkBackend, StarkHttpErrorWrapper, StarkHttpErrorWrapperImpl } from "../../http/entities";
import { StarkLoggingService, STARK_LOGGING_SERVICE } from "../../logging/services/logging.service.intf";

/**
 * Service to get/store the XSRF token to be used with the different backends.
 * It also adds the XSRF configuration to XHR objects for those HTTP requests not performed using StarkHttpService or Angular's HttpClient.
 */
@Injectable()
export class StarkXSRFServiceImpl implements StarkXSRFService {
	protected xsrfCookieName: string = "XSRF-TOKEN";
	protected currentToken: string | undefined;

	public constructor(
		@Inject(STARK_APP_CONFIG) public appConfig: StarkApplicationConfig,
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		private httpClient: HttpClient,
		@Inject(DOCUMENT) public document: Document,
		private injector: Injector,
		@Inject(STARK_XSRF_CONFIG) public configOptions?: StarkXSRFConfig
	) {
		this.logger.debug(starkXSRFServiceName + " loaded");
	}

	public configureXHR(xhr: XMLHttpRequest): void {
		// in order to be able to configure the XHR object, we should call the setRequestHeader to add the XSRF header
		// however the open() method should be called first, so we throw an error if that is not case
		// see: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
		if (xhr.readyState === XMLHttpRequest.OPENED) {
			const xsrfToken: string | undefined = this.getXSRFToken();

			if (typeof xsrfToken !== "undefined") {
				// Enforce the 'withCredentials' property flag on every XHR object.
				// We leverage "credentialed" requests that are aware of HTTP cookies (necessary for XSRF to work with multiple backends)
				// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Requests_with_credentials
				xhr.withCredentials = true;

				xhr.setRequestHeader(StarkHttpHeaders.XSRF_TOKEN, xsrfToken);
			}
		} else {
			throw new Error(
				starkXSRFServiceName +
					": cannot set headers to XHR object because its open() method has not been invoked.\n" +
					"Make sure that the XHR open() method is called first before calling " +
					starkXSRFServiceName +
					" configureXHR()"
			);
		}
	}

	public configureHttpRequest(request: HttpRequest<any>): HttpRequest<any> {
		if (request.method.match(/POST|PUT|PATCH|DELETE/)) {
			const xsrfToken: string | undefined = this.getXSRFToken();

			if (typeof xsrfToken !== "undefined") {
				const newHeaders: HttpHeaders = request.headers.set(StarkHttpHeaders.XSRF_TOKEN, xsrfToken);

				return request.clone({
					headers: newHeaders,
					// Enforce the 'withCredentials' property flag on every XHR object created by Angular $http.
					// We leverage "credentialed" requests that are aware of HTTP cookies (necessary for XSRF to work with multiple backends)
					// https://angular.io/api/common/http/HttpRequest#withCredentials
					// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Requests_with_credentials
					withCredentials: true
				});
			}
		}

		// in any case the "withCredentials: true" should be added to ALL requests, otherwise the browser won't accept the XSRF cookie from the backend!
		// see: https://angular.io/api/common/http/HttpRequest#withCredentials
		// see: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Requests_with_credentials
		return request.clone({ withCredentials: true });
	}

	public getXSRFToken(): string | undefined {
		const xsrfToken: string | undefined = this.currentToken;

		if (typeof xsrfToken === "undefined") {
			const errorMsg: string =
				starkXSRFServiceName +
				": no XSRF token found. This could be due to:\n" +
				"- the backend has not sent the XSRF token properly, either the cookie was not sent or it has a different name\n" +
				"- the application did not store the XSRF token correctly, either it has a different name or it comes from a different origin";

			this.logger.warn(errorMsg);
			// could throw an error: throw new Error(errorMsg);
		} else {
			// overwrite the cookie with the current token to ensure that we always send the same token
			// regardless of the new tokens sent by the backend(s) in every response
			this.setXSRFCookie(xsrfToken);
		}

		return xsrfToken;
	}

	public storeXSRFToken(): void {
		if (this.currentToken) {
			// overwrite the cookie with the token we stored (we don't care about the rest of tokens but just the one we stored)
			this.setXSRFCookie(this.currentToken);
		} else {
			// store the token only if it is not stored yet
			const xsrfCookie: string | undefined = this.getXSRFCookie();
			this.currentToken = xsrfCookie && xsrfCookie !== "" ? xsrfCookie : undefined;
		}
	}

	public pingBackends(): void {
		const backendsMap: Map<string, StarkBackend> = this.appConfig.getBackends();

		const waitFor$: Observable<string> = this.getWaitBeforePingingObs();

		waitFor$.pipe(take(1)).subscribe(() => {
			backendsMap.forEach((backendConfig: StarkBackend) => {
				// here the Angular HttpClient is used instead of the StarkHttpService because the response can be anything
				// and the StarkHttpService expects only JSON responses causing it to throw an exception
				this.httpClient
					.get(backendConfig.url, {
						observe: "response", // full response, not only the body
						responseType: "text" // body as text to allow any kind of response and avoid having weird exceptions as with the StarkHttpService
					})
					.subscribe({
						// error: (errorWrapper: StarkHttpErrorWrapper) => {
						error: (errorResponse: HttpErrorResponse) => {
							// the backend might return 404 Not Found, but it will still send the cookie
							if (errorResponse.status !== StarkHttpStatusCodes.HTTP_404_NOT_FOUND) {
								const httpResponseHeaders: Map<string, string> = new Map<string, string>();
								for (const headerName of errorResponse.headers.keys()) {
									httpResponseHeaders.set(headerName, <string>errorResponse.headers.get(headerName));
								}
								const errorWrapper: StarkHttpErrorWrapper = new StarkHttpErrorWrapperImpl(
									errorResponse,
									httpResponseHeaders,
									errorResponse.error
								);

								const errorMsg: string =
									starkXSRFServiceName + ": ping sent to backend '" + backendConfig.name + "' failed.";
								this.logger.error(errorMsg, <any>errorWrapper);
							}
						}
					});
			});
		});
	}

	/**
	 * Extracts the Promise/Observable that the service should wait for before pinging all the backends.
	 * Such Promise/Observable is extracted from the configuration object (if any) passed to the StarkXSRFModule.forRoot()
	 */
	protected getWaitBeforePingingObs(): Observable<any> {
		if (this.configOptions && this.configOptions.waitBeforePinging) {
			let waitBeforePingingFn: Function;
			let waitBeforePingingDeps: any[] = [];

			if (typeof this.configOptions.waitBeforePinging === "object") {
				waitBeforePingingFn = this.configOptions.waitBeforePinging.waitBeforePingingFn;
				// for a StarkXSRFWaitBeforePingingLiteral we should get all the DI dependencies via the Angular Injector
				waitBeforePingingDeps = this.configOptions.waitBeforePinging.deps.map((diDependency: any) => {
					return this.injector.get<any>(diDependency);
				});
			} else {
				waitBeforePingingFn = this.configOptions.waitBeforePinging;
			}

			return from(waitBeforePingingFn(...waitBeforePingingDeps) || ["no wait"]);
		}

		return of("no wait");
	}

	protected setXSRFCookie(xsrfToken: string): void {
		const cookieExpiration: string = moment()
			.add(40, "m")
			.toDate()
			.toUTCString(); // 40 minutes from now

		const cookieAttributes: string[] = [`${this.xsrfCookieName}=${xsrfToken}`, `path='/'`, `expires=${cookieExpiration}`];

		this.document.cookie = cookieAttributes.join(";");
	}

	// code taken from ngx-cookie-service library (https://github.com/7leads/ngx-cookie-service/blob/master/lib/cookie-service/cookie.service.ts)
	protected getXSRFCookie(): string | undefined {
		const cookieRegExp: RegExp = this.getCookieRegExp(encodeURIComponent(this.xsrfCookieName));
		const result: RegExpExecArray | null = cookieRegExp.exec(this.document.cookie);

		if (result) {
			return decodeURIComponent(result[1]);
		} else {
			return undefined;
		}
	}

	private getCookieRegExp(cookieName: string): RegExp {
		const escapedName: string = cookieName.replace(/([\[\]\{\}\(\)\|\=\;\+\?\,\.\*\^\$])/gi, "\\$1");

		return new RegExp("(?:^" + escapedName + "|;\\s*" + escapedName + ")=(.*?)(?:;|$)", "g");
	}
}
