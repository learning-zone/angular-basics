import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { starkSettingsReducers } from "./reducers";
import { STARK_SETTINGS_SERVICE, StarkSettingsServiceImpl } from "./services";
import { StarkSettingsEffects } from "./effects";

@NgModule({
	imports: [StoreModule.forFeature("StarkSettings", starkSettingsReducers), EffectsModule.forFeature([StarkSettingsEffects])]
})
export class StarkSettingsModule {
	/**
	 * Instantiates the services only once since they should be singletons
	 * so the forRoot() should be called only by the AppModule
	 * @link https://angular.io/guide/singleton-services#forroot
	 * @returns a module with providers
	 */
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: StarkSettingsModule,
			providers: [{ provide: STARK_SETTINGS_SERVICE, useClass: StarkSettingsServiceImpl }]
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
		parentModule: StarkSettingsModule
	) {
		if (parentModule) {
			throw new Error("StarkSettingsModule is already loaded. Import it in the AppModule only");
		}
	}
}
