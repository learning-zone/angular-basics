import { NgModuleRef } from "@angular/core";
import { StarkEnvironment } from "@nationalbankbelgium/stark-core";

export const environment: StarkEnvironment = {
	production: true,
	hmr: false,
	ENV_PROVIDERS: [],
	/**
	 * Customize the app module.
	 * @param moduleRef - NgModule Instance created by Angular for a given platform.
	 */
	decorateModule(moduleRef: NgModuleRef<any>): NgModuleRef<any> {
		// perform any module customization needed for this specific environment here
		// and make sure to invoke this function by passing it the NgModule created by Angular
		return moduleRef;
	}
};
