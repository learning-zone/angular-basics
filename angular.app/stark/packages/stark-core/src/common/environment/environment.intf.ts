import { NgModuleRef } from "@angular/core";

/**
 * Interface to be implemented by all environments
 */
export interface StarkEnvironment {
	/**
	 * Whether the current environment is production (as described in Angular CLI Wiki)
	 * @link https://github.com/angular/angular-cli/wiki/stories-application-environments
	 */
	production: boolean;
	/**
	 * Whether the current environment has Hot Module Replacement enabled (as described in Angular CLI Wiki)
	 * @link https://github.com/angular/angular-cli/wiki/stories-configure-hmr
	 */
	hmr: boolean;
	/**
	 * Array of providers to be included only in this environment.
	 * For example: you might want to add a detailed logging provider only in development.
	 */
	ENV_PROVIDERS: any[];
	/**
	 * Function to modify/decorate the module instance created by Angular for a given platform.
	 * Useful to enable/disable some Angular specifics such as the debug tools.
	 * @param moduleRef - NgModule instance created by Angular for a given platform.
	 */
	decorateModule(moduleRef: NgModuleRef<any>): NgModuleRef<any>;
}

/**
 * Create an empty dummy environment constant (the actual values will be defined in the client app)
 * @ignore
 */
const dummyEnv: Partial<StarkEnvironment> = {};

/**
 * Export the dummy constant as "environment" to be able to mimic the way it should be imported in the client app
 * like this:  import { environment } from "environments/environment";
 * @ignore
 */
export const environment: StarkEnvironment = <StarkEnvironment>dummyEnv;
