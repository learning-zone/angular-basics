import {InjectionToken} from "@angular/core";

/**
 * The InjectionToken version of the config name
 */
export const STARK_SESSION_CONFIG: InjectionToken<StarkSessionConfig> = new InjectionToken<
	StarkSessionConfig
	>("StarkSessionConfig");

/**
 * Definition of the configuration object for the Stark Session service
 */
export interface StarkSessionConfig {
	sessionExpiredStateName?: string;
	sessionLogoutStateName?: string;
}
