import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { UIRouterModule } from "@uirouter/angular";
import { StarkRoutingServiceImpl, STARK_ROUTING_SERVICE } from "./services";

@NgModule({
	imports: [UIRouterModule.forChild()]
})
export class StarkRoutingModule {
	/**
	 * Instantiates the services only once since they should be singletons
	 * so the forRoot() should be called only by the AppModule
	 * @link https://angular.io/guide/singleton-services#forroot
	 * @returns a module with providers
	 */
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: StarkRoutingModule,
			providers: [{ provide: STARK_ROUTING_SERVICE, useClass: StarkRoutingServiceImpl }]
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
		parentModule: StarkRoutingModule
	) {
		if (parentModule) {
			throw new Error("StarkRoutingModule is already loaded. Import it in the AppModule only");
		}
	}
}
