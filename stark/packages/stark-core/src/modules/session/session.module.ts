import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { starkSessionReducers } from "./reducers";
import { StarkSessionConfig, STARK_SESSION_CONFIG } from "./entities";
import { STARK_SESSION_SERVICE, StarkSessionServiceImpl } from "./services";
import { StoreModule } from "@ngrx/store";

import { StarkUserModule } from "../user/user.module";

@NgModule({
	imports: [StoreModule.forFeature("StarkSession", starkSessionReducers), StarkUserModule]
})
export class StarkSessionModule {
	/**
	 * Instantiates the services only once since they should be singletons
	 * so the forRoot() should be called only by the AppModule
	 * @link https://angular.io/guide/singleton-services#forroot
	 * @param sessionConfig - Object containing the configuration (if any) for the Session service
	 * @returns a module with providers
	 */
	public static forRoot(sessionConfig?: StarkSessionConfig): ModuleWithProviders {
		return {
			ngModule: StarkSessionModule,
			providers: [
				{ provide: STARK_SESSION_SERVICE, useClass: StarkSessionServiceImpl },
				{ provide: STARK_SESSION_CONFIG, useValue: sessionConfig }
			]
		};
	}

	/**
	 * Prevents this module from being re-imported
	 * @link https://angular.io/guide/singleton-services#prevent-reimport-of-the-coremodule
	 * @param parentModule - the parent module
	 */
	public constructor(
		@Optional()
		@SkipSelf()
		parentModule: StarkSessionModule
	) {
		if (parentModule) {
			throw new Error("StarkSessionModule is already loaded. Import it in the AppModule only");
		}
	}
}
