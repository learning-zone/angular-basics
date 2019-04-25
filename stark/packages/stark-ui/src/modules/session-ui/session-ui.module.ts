import { ApplicationInitStatus, Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import {
	StarkLoginPageComponent,
	StarkPreloadingPageComponent,
	StarkSessionExpiredPageComponent,
	StarkSessionLogoutPageComponent
} from "./pages";
import { UIRouterModule } from "@uirouter/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule, Location } from "@angular/common";
import { SESSION_MODULE_STATES } from "./routes";
import { from } from "rxjs";
import {
	STARK_ROUTING_SERVICE,
	starkLoginStateName,
	starkPreloadingStateName,
	StarkRoutingService,
} from "@nationalbankbelgium/stark-core";
import { StarkAppContainerComponent } from "./components";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
	declarations: [
		StarkLoginPageComponent,
		StarkPreloadingPageComponent,
		StarkSessionExpiredPageComponent,
		StarkSessionLogoutPageComponent,
		StarkAppContainerComponent
	],
	exports: [
		StarkLoginPageComponent,
		StarkPreloadingPageComponent,
		StarkSessionExpiredPageComponent,
		StarkSessionLogoutPageComponent,
		StarkAppContainerComponent
	],
	imports: [
		CommonModule,
		UIRouterModule.forChild({
			states: SESSION_MODULE_STATES
		}),
		MatButtonModule,
		TranslateModule
	],
	providers: [
		Location
	],
})
export class StarkSessionUiModule {
	/**
	 * Instantiates the services only once since they should be singletons
	 * so the forRoot() should be called only by the AppModule
	 * @link https://angular.io/guide/singleton-services#forroot
	 * @returns a module with providers
	 */
	public static forRoot(): ModuleWithProviders {
		return {
			ngModule: StarkSessionUiModule
		};
	}

	/**
	 * Prevents this module from being re-imported
	 * @link https://angular.io/guide/singleton-services#prevent-reimport-of-the-coremodule
	 * @param parentModule - The parent module
	 * @param routingService - The routing service of the application
	 * @param appInitStatus - A class that reflects the state of running {@link APP_INITIALIZER}s
	 */
	public constructor(
		@Optional()
		@SkipSelf()
		parentModule: StarkSessionUiModule,
		@Inject(STARK_ROUTING_SERVICE) routingService: StarkRoutingService,
		appInitStatus: ApplicationInitStatus
	) {
		if (parentModule) {
			throw new Error("StarkSessionUiModule is already loaded. Import it in the AppModule only");
		}

		// this logic cannot be executed in an APP_INITIALIZER factory because the StarkRoutingService uses the StarkLoggingService
		// which needs the "logging" state to be already defined in the Store (which NGRX defines internally via APP_INITIALIZER factories :p)
		from(appInitStatus.donePromise).subscribe(() => {
			if (ENV === "development") {
				routingService.navigateTo(starkLoginStateName);
			} else {
				routingService.navigateTo(starkPreloadingStateName);
			}
		});
	}
}
