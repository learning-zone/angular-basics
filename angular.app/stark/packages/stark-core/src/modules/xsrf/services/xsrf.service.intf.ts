import { InjectionToken } from "@angular/core";
import { HttpRequest } from "@angular/common/http";

/**
 * The name of the service in case an injection is needed
 */
export const starkXSRFServiceName: string = "StarkXSRFService";
/**
 * The InjectionToken version of the service name
 */
export const STARK_XSRF_SERVICE: InjectionToken<StarkXSRFService> = new InjectionToken<StarkXSRFService>(starkXSRFServiceName);

/**
 * Stark XSRF Service.
 * Service to get/store the XSRF token to be used with the different backends.
 */
export interface StarkXSRFService {
	/**
	 * Add the necessary options to the XHR config in order to enable XSRF protection.
	 * Since the service will add the XSRF header to the XHR object, this method must be called after calling the XHR open() method because
	 * headers cannot be set before open(). See https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/setRequestHeader
	 * This method should be used for those HTTP state-changing requests (POST, PUT, PATCH or DELETE) which are not performed
	 * using StarkHttpService or Angular raw $http
	 * @param xhr - The XHR object to be configured
	 */
	configureXHR(xhr: XMLHttpRequest): void;

	/**
	 * Return a new `HttpRequest` including the necessary options for state-changing requests (POST, PUT, PATCH or DELETE)
	 * in order to enable XSRF protection.
	 * Logs a warning whenever there is no XSRF token to be sent in such requests
	 * @param request - The Angular `HttpRequest` to be modified
	 * @returns The modified Angular `HttpRequest`
	 */
	configureHttpRequest(request: HttpRequest<any>): HttpRequest<any>;

	/**
	 * Get the current XSRF token (in case there is one already stored)
	 */
	getXSRFToken(): string | undefined;

	/**
	 * Store the token from the current XSRF cookie
	 */
	storeXSRFToken(): void;

	/**
	 * Trigger a GET Http request to all the backends in order to get their XSRF tokens.
	 * Then the response is intercepted by the XSRF Http Interceptor to store the token from the current XSRF cookie
	 */
	pingBackends(): void;
}
