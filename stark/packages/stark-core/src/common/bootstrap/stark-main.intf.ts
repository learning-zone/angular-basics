import { NgModuleRef } from "@angular/core";

/**
 * Main entry point
 */
export interface StarkMain {
	/**
	 * Main function: responsible for starting the application.
	 */
	main: () => Promise<any>;

	/**
	 * Bootstrap the loading process.
	 */
	bootstrap(): void;

	/**
	 * Function to modify/decorate the module instance created by Angular for a given platform.
	 * Useful to enable/disable some Angular specifics such as the debug tools.
	 * @param moduleRef - NgModule instance created by Angular for a given platform.
	 */
	decorateModule(moduleRef: NgModuleRef<any>): NgModuleRef<any>;
}
