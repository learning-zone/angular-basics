/*tslint:disable:completed-docs*/
import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from "@angular/common/http";
import { fakeAsync, tick } from "@angular/core/testing";
import { Injector } from "@angular/core";
import { Observable, of, Subject, throwError } from "rxjs";
import { StarkHttpHeaders } from "../../http/constants";
import { StarkLoggingService } from "../../logging/services";
import { StarkXSRFServiceImpl } from "./xsrf.service";
import { StarkXSRFConfig } from "./xsrf-config.intf";
import { StarkApplicationConfig, StarkApplicationConfigImpl } from "../../../configuration/entities";
import { StarkBackend, StarkBackendAuthenticationTypes } from "../../http/entities";
import { MockStarkLoggingService } from "../../logging/testing/logging.mock";
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import CallInfo = jasmine.CallInfo;

/* tslint:disable-next-line:no-big-function */
describe("Service: StarkXSRFService", () => {
	let xsrfService: StarkXSRFServiceHelper;
	let appConfig: StarkApplicationConfig;
	let mockDocument: Pick<Document, "cookie">;
	let mockInjectorService: SpyObj<Injector>;
	let mockXsrfConfig: StarkXSRFConfig;

	const mockLogger: StarkLoggingService = new MockStarkLoggingService();
	const httpMock: SpyObj<HttpClient> = createSpyObj<HttpClient>("HttpClient", ["get"]);
	const mockXSRFToken: string = "dummy xsrf token";
	const dummyHeader: string = "X-DUMMY-HEADER";

	const mockBackend1: StarkBackend = {
		name: "dummy backend 1",
		url: "dummy/url",
		authenticationType: StarkBackendAuthenticationTypes.PUBLIC,
		devAuthenticationEnabled: false,
		devAuthenticationRolePrefix: ""
	};
	const mockBackend2: StarkBackend = { ...mockBackend1, name: "dummy backend 2", url: "other/url" };
	const mockBackend3: StarkBackend = { ...mockBackend1, name: "dummy backend 3", url: "another/url" };

	// FIXME: this tslint disable flag is due to a bug in 'no-element-overwrite' rule. Remove it once it is solved
	/* tslint:disable:no-element-overwrite */
	beforeEach(() => {
		appConfig = new StarkApplicationConfigImpl();
		appConfig.backends = new Map<string, StarkBackend>();
		appConfig.backends.set(mockBackend1.name, mockBackend1);
		appConfig.backends.set(mockBackend2.name, mockBackend2);
		appConfig.backends.set(mockBackend3.name, mockBackend3);
		mockDocument = { cookie: "" };
		mockInjectorService = jasmine.createSpyObj<Injector>("injector,", ["get"]);
		mockXsrfConfig = {};

		(<Spy>mockLogger.error).calls.reset();
		(<Spy>mockLogger.warn).calls.reset();
		httpMock.get.calls.reset();

		xsrfService = new StarkXSRFServiceHelper(appConfig, mockLogger, httpMock, <any>mockDocument, mockInjectorService, mockXsrfConfig);
	});
	/* tslint:enable:no-element-overwrite */

	describe("configureXHR", () => {
		it("should add the necessary options to the XHR object in order to enable XSRF protection", () => {
			spyOn(xsrfService, "getXSRFToken").and.returnValue(mockXSRFToken);

			const mockXHR: XMLHttpRequest = new XMLHttpRequest();
			mockXHR.open("GET", "some/url");

			spyOn(mockXHR, "setRequestHeader");

			xsrfService.configureXHR(mockXHR);

			expect(xsrfService.getXSRFToken).toHaveBeenCalledTimes(1);
			expect(mockXHR.setRequestHeader).toHaveBeenCalledTimes(1);
			expect(mockXHR.setRequestHeader).toHaveBeenCalledWith(StarkHttpHeaders.XSRF_TOKEN, mockXSRFToken);
			expect(mockXHR.withCredentials).toBe(true);
		});

		it("should NOT add any options to the XHR object if the XSRF token is not yet stored", () => {
			spyOn(xsrfService, "getXSRFToken").and.returnValue(undefined);

			const mockXHR: XMLHttpRequest = new XMLHttpRequest();
			mockXHR.open("GET", "some/url");

			spyOn(mockXHR, "setRequestHeader");

			xsrfService.configureXHR(mockXHR);

			expect(xsrfService.getXSRFToken).toHaveBeenCalledTimes(1);
			expect(mockXHR.setRequestHeader).not.toHaveBeenCalled();
			expect(mockXHR.withCredentials).toBe(false);
		});

		it("should THROW an error when it was called without calling the XHE open() method before", () => {
			const mockXHR: XMLHttpRequest = new XMLHttpRequest();

			expect(() => xsrfService.configureXHR(mockXHR)).toThrowError(/open\(\) method has not been invoked/);
		});
	});

	describe("configureHttpRequest", () => {
		it("should create a new Angular HttpRequest with the XSRF protection enabled if the HTTP method is POST, PUT, PATCH or DELETE", () => {
			spyOn(xsrfService, "getXSRFToken").and.returnValue(mockXSRFToken);

			const stateChangingMethods: string[] = ["POST", "PUT", "PATCH", "DELETE"];

			function headersShouldBeInitialized(httpMethod: string): boolean {
				return httpMethod === "PUT" || httpMethod === "PATCH";
			}

			for (const stateChangingMethod of stateChangingMethods) {
				(<Spy>xsrfService.getXSRFToken).calls.reset();

				let mockHttpRequest: HttpRequest<any> = new HttpRequest<any>(<any>stateChangingMethod, "dummy/url");

				if (headersShouldBeInitialized(stateChangingMethod)) {
					mockHttpRequest = mockHttpRequest.clone({ headers: mockHttpRequest.headers.set(dummyHeader, "dummy value") });
				}

				const protectedConfig: HttpRequest<any> = xsrfService.configureHttpRequest(mockHttpRequest);

				expect(xsrfService.getXSRFToken).toHaveBeenCalledTimes(1);
				expect(protectedConfig).not.toBe(mockHttpRequest);
				expect(protectedConfig).not.toEqual(mockHttpRequest);
				expect(protectedConfig.withCredentials).toBe(true);
				expect(protectedConfig.headers).toBeDefined();
				expect(protectedConfig.headers.get(StarkHttpHeaders.XSRF_TOKEN)).toBe(mockXSRFToken);

				if (headersShouldBeInitialized(stateChangingMethod)) {
					expect(protectedConfig.headers.get(dummyHeader)).toBe("dummy value");
				}
			}
		});

		it("should leave the HttpRequest 'as is' if the XSRF token is not yet stored", () => {
			spyOn(xsrfService, "getXSRFToken").and.returnValue(undefined);

			const stateChangingMethods: string[] = ["POST", "PUT", "PATCH", "DELETE"];

			for (const stateChangingMethod of stateChangingMethods) {
				(<Spy>xsrfService.getXSRFToken).calls.reset();

				const mockHttpRequest: HttpRequest<any> = new HttpRequest<any>(<any>stateChangingMethod, "dummy/url");

				const protectedRequest: HttpRequest<any> = xsrfService.configureHttpRequest(mockHttpRequest);

				expect(xsrfService.getXSRFToken).toHaveBeenCalledTimes(1);
				expect(protectedRequest).toEqual(mockHttpRequest.clone({ withCredentials: true }));
				expect(protectedRequest.withCredentials).toBe(true);
				expect(protectedRequest.headers.keys().length).toBe(0);
			}
		});

		it("should only add 'withCredentials: true' if the HTTP method is not POST, PUT, PATCH nor DELETE", () => {
			spyOn(xsrfService, "getXSRFToken");

			const nonStateChangingMethods: string[] = ["GET", "HEAD", "CONNECT", "OPTIONS", "TRACE"];

			function headersShouldBeInitialized(httpMethod: string): boolean {
				return httpMethod === "GET" || httpMethod === "OPTIONS";
			}

			for (const nonStateChangingMethod of nonStateChangingMethods) {
				let mockHttpRequest: HttpRequest<any> = new HttpRequest<any>(<any>nonStateChangingMethod, "dummy/url");

				if (headersShouldBeInitialized(nonStateChangingMethod)) {
					mockHttpRequest = mockHttpRequest.clone({ headers: mockHttpRequest.headers.set(dummyHeader, "some value") });
				}

				const protectedRequest: HttpRequest<any> = xsrfService.configureHttpRequest(mockHttpRequest);

				expect(xsrfService.getXSRFToken).not.toHaveBeenCalled();
				expect(protectedRequest).toEqual(mockHttpRequest.clone({ withCredentials: true }));
				expect(protectedRequest.withCredentials).toBe(true);

				if (headersShouldBeInitialized(nonStateChangingMethod)) {
					expect(protectedRequest.headers.keys().length).toBeGreaterThan(0);
					expect(protectedRequest.headers.get(dummyHeader)).toBe("some value");
					expect(protectedRequest.headers.get(StarkHttpHeaders.XSRF_TOKEN)).toBeNull();
				} else {
					expect(protectedRequest.headers.keys().length).toBe(0);
				}
			}
		});
	});

	describe("getXSRFToken", () => {
		it("should return the XSRF token in case there is one already stored", () => {
			xsrfService.setCurrentToken(mockXSRFToken);

			const xsrfToken: string = <string>xsrfService.getXSRFToken();

			expect(xsrfToken).toBe(mockXSRFToken);
			expect(mockLogger.warn).not.toHaveBeenCalled();
		});

		it("should overwrite the XSRF cookie with the XSRF token that is already stored", () => {
			xsrfService.setCurrentToken(mockXSRFToken);
			spyOn(xsrfService, "setXSRFCookie").and.callThrough();

			const xsrfToken: string = <string>xsrfService.getXSRFToken();

			expect(xsrfToken).toBe(mockXSRFToken);
			expect(xsrfService.setXSRFCookie).toHaveBeenCalledTimes(1);
			expect(xsrfService.setXSRFCookie).toHaveBeenCalledWith(xsrfToken);
			expect(mockDocument.cookie.length).toBeGreaterThan(0);
			const cookieOptions: any[] = mockDocument.cookie.split(";");
			expect(cookieOptions.length).toBe(3);
			expect(cookieOptions[0]).toBe(xsrfService.getXsrfCookieName() + "=" + mockXSRFToken);
			expect(cookieOptions[1]).toBe("path='/'");
			expect(cookieOptions[2]).toMatch(new RegExp("expires=.*(" + new Date().getFullYear() + ")"));
		});

		it("should return undefined and log a warning in case there is no XSRF token yet", () => {
			xsrfService.setCurrentToken(undefined);

			const xsrfToken: undefined = <undefined>xsrfService.getXSRFToken();

			expect(xsrfToken).toBeUndefined();
			expect(mockLogger.warn).toHaveBeenCalledTimes(1);
			const warningMessage: string = (<Spy>mockLogger.warn).calls.argsFor(0)[0];
			expect(warningMessage).toContain("no XSRF token found");
		});
	});

	describe("storeXSRFToken", () => {
		it("should store the XSRF token coming in the XSRF cookie if it has not been stored yet", () => {
			xsrfService.setCurrentToken(undefined);
			spyOn(xsrfService, "getXSRFCookie").and.returnValue(mockXSRFToken);

			xsrfService.storeXSRFToken();

			expect(xsrfService.getXSRFCookie).toHaveBeenCalledTimes(1);
			expect(xsrfService.getCurrentToken()).toBe(mockXSRFToken);
		});

		it("should store an undefined value if it has not been stored yet and the XSRF cookie does not exist or it is empty", () => {
			xsrfService.setCurrentToken(undefined);
			spyOn(xsrfService, "getXSRFCookie").and.returnValues(undefined, "");

			xsrfService.storeXSRFToken();

			expect(xsrfService.getXSRFCookie).toHaveBeenCalledTimes(1);
			expect(xsrfService.getCurrentToken()).toBeUndefined();

			(<Spy>xsrfService.getXSRFCookie).calls.reset();
			xsrfService.storeXSRFToken();

			expect(xsrfService.getXSRFCookie).toHaveBeenCalledTimes(1);
			expect(xsrfService.getCurrentToken()).toBeUndefined();
		});

		it("should just overwrite the XSRF cookie with the XSRF token that is already stored", () => {
			xsrfService.setCurrentToken(mockXSRFToken);
			spyOn(xsrfService, "setXSRFCookie").and.callThrough();

			xsrfService.storeXSRFToken();

			expect(xsrfService.setXSRFCookie).toHaveBeenCalledTimes(1);
			expect(xsrfService.setXSRFCookie).toHaveBeenCalledWith(xsrfService.getCurrentToken());
			expect(mockDocument.cookie.length).toBeGreaterThan(0);
			const cookieOptions: any[] = mockDocument.cookie.split(";");
			expect(cookieOptions.length).toBe(3);
			expect(cookieOptions[0]).toBe(xsrfService.getXsrfCookieName() + "=" + mockXSRFToken);
			expect(cookieOptions[1]).toBe("path='/'");
			expect(cookieOptions[2]).toMatch(new RegExp("expires=.*(" + new Date().getFullYear() + ")"));
		});
	});

	describe("pingBackends", () => {
		it("should trigger an HTTP call to every backend defined in the application configuration", fakeAsync(() => {
			httpMock.get.and.returnValue(of(new HttpResponse({ body: "ping OK" })));

			xsrfService.pingBackends();
			tick();

			expect(httpMock.get).toHaveBeenCalledTimes(appConfig.backends.size);
			const httpCalls: CallInfo[] = httpMock.get.calls.all();
			let callIndex: number = 0;

			appConfig.backends.forEach((backendConfig: StarkBackend) => {
				expect(httpCalls[callIndex].args[0]).toBe(backendConfig.url);
				expect(httpCalls[callIndex].args[1]).toEqual({ observe: "response", responseType: "text" });
				callIndex++;
			});

			expect(mockLogger.error).not.toHaveBeenCalled();
		}));

		it("should log an error when the HTTP call to a backend failed", fakeAsync(() => {
			const failingBackends: StarkBackend[] = [mockBackend1, mockBackend3];

			httpMock.get.and.callFake((url: string) => {
				if (failingBackends.map((failingBackend: StarkBackend) => failingBackend.url).indexOf(url) !== -1) {
					return throwError(new HttpErrorResponse({ error: "ping failed" }));
				} else {
					return of(new HttpResponse({ body: "ping OK" }));
				}
			});

			xsrfService.pingBackends();
			tick();

			expect(httpMock.get).toHaveBeenCalledTimes(appConfig.backends.size);
			const httpCalls: CallInfo[] = httpMock.get.calls.all();
			let httpCallIdx: number = 0;

			appConfig.backends.forEach((backendConfig: StarkBackend) => {
				expect(httpCalls[httpCallIdx].args[0]).toBe(backendConfig.url);
				expect(httpCalls[httpCallIdx].args[1]).toEqual({ observe: "response", responseType: "text" });
				httpCallIdx++;
			});

			expect(mockLogger.error).toHaveBeenCalledTimes(failingBackends.length);
			const logErrorCalls: CallInfo[] = (<Spy>mockLogger.error).calls.all();
			let logErrorCallIdx: number = 0;

			for (const failingBackend of failingBackends) {
				expect(logErrorCalls[logErrorCallIdx].args[0]).toContain(failingBackend.name);
				logErrorCallIdx++;
			}
		}));

		it("should NOT trigger any HTTP call until the waitBeforePinging observable emits", () => {
			httpMock.get.and.returnValue(of(new HttpResponse({ body: "ping OK" })));
			const mockWaitBeforePinging$: Subject<any> = new Subject<any>();
			spyOn(xsrfService, "getWaitBeforePingingObs").and.returnValue(mockWaitBeforePinging$);

			xsrfService.pingBackends();

			expect(httpMock.get).not.toHaveBeenCalled();

			mockWaitBeforePinging$.next("stop waiting");
			mockWaitBeforePinging$.complete();

			expect(httpMock.get).toHaveBeenCalledTimes(appConfig.backends.size);
		});
	});

	class StarkXSRFServiceHelper extends StarkXSRFServiceImpl {
		public constructor(
			applicationConfig: StarkApplicationConfig,
			logger: StarkLoggingService,
			httpClient: HttpClient,
			document: Document,
			injector: Injector,
			config: StarkXSRFConfig
		) {
			super(applicationConfig, logger, httpClient, document, injector, config);
		}

		public getXSRFCookie(): string | undefined {
			return super.getXSRFCookie();
		}

		public setXSRFCookie(xsrfToken: string): void {
			super.setXSRFCookie(xsrfToken);
		}

		public getWaitBeforePingingObs(): Observable<any> {
			return super.getWaitBeforePingingObs();
		}

		public getXsrfCookieName(): string {
			return this.xsrfCookieName;
		}

		public getCurrentToken(): string | undefined {
			return this.currentToken;
		}

		public setCurrentToken(token: string | undefined): void {
			this.currentToken = token;
		}
	}
});
