import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";

/**
 * The InjectionToken version of the config name
 */
export const STARK_XSRF_CONFIG: InjectionToken<StarkXSRFConfig> = new InjectionToken<StarkXSRFConfig>("StarkXSRFConfig");

/**
 * Alternative literal object to define the waitBeforePinging function and its DI dependencies
 */
export interface StarkXSRFWaitBeforePingingLiteral {
	/**
	 * Array of Dependency Injection tokens for the dependencies of the waitBeforePingingFn.
	 */
	deps: any[];

	/**
	 * Function that will be called by the XSRF service passing the necessary dependencies to get the corresponding Promise/Observable
	 * that the service should wait for before pinging all the backends.
	 */
	waitBeforePingingFn: (...deps: any[]) => Promise<any> | PromiseLike<any> | Observable<any>;
}

/**
 * Definition of the configuration object for the Stark XSRF service
 */
export interface StarkXSRFConfig {
	/**
	 * Function that will be called by the XSRF service to get the corresponding Promise/Observable
	 * that the service should wait for before pinging all the backends.
	 * Alternatively, this can be defined as a {@link StarkXSRFWaitBeforePingingLiteral|literal}
	 */
	waitBeforePinging?: (() => Promise<any> | PromiseLike<any> | Observable<any>) | StarkXSRFWaitBeforePingingLiteral;
}
