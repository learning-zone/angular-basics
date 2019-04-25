import { NgModule, Optional, SkipSelf } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatSidenavModule } from "@angular/material/sidenav";
import { StarkAppSidebarComponent } from "./components";
import { STARK_APP_SIDEBAR_SERVICE, StarkAppSidebarServiceImpl } from "./services";
import { ModuleWithProviders } from "@angular/compiler/src/core";

@NgModule({
	declarations: [StarkAppSidebarComponent],
	imports: [CommonModule, MatSidenavModule],
	exports: [StarkAppSidebarComponent]
})
export class StarkAppSidebarModule {
	/**
	 * Instantiates the services only once since they should be singletons
	 * so the forRoot() should be called only by the AppModule
	 * @link https://angular.io/guide/singleton-services#forroot
	 * @returns a module with providers
	 */
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: StarkAppSidebarModule,
			providers: [{ provide: STARK_APP_SIDEBAR_SERVICE, useClass: StarkAppSidebarServiceImpl }]
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
		parentModule: StarkAppSidebarModule
	) {
		if (parentModule) {
			throw new Error("StarkAppSidebarModule is already loaded. Import it in the AppModule only");
		}
	}
}
