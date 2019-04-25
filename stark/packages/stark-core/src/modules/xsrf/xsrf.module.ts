import { ApplicationInitStatus, Inject, ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { from } from "rxjs";
import { StarkXSRFServiceImpl, STARK_XSRF_SERVICE, StarkXSRFService, StarkXSRFConfig, STARK_XSRF_CONFIG } from "./services";
import { StarkHttpHeaders } from "../http/constants";
import { StarkXSRFHttpInterceptor } from "./interceptors/http-xsrf.interceptor";

@NgModule({
	imports: [
		HttpClientModule,
		HttpClientXsrfModule.withOptions({
			// Name of cookie containing the XSRF token. Default value in Angular is 'XSRF-TOKEN'
			// https://angular.io/guide/http#security-xsrf-protection
			cookieName: "XSRF-TOKEN",
			// Name of HTTP header to populate with the XSRF token. Default value in Angular is 'X-XSRF-TOKEN'.
			// https://angular.io/guide/http#security-xsrf-protection
			headerName: StarkHttpHeaders.XSRF_TOKEN
		})
	]
})
export class StarkXSRFModule {
	/**
	 * Instantiates the services only once since they should be singletons
	 * so the forRoot() should be called only by the AppModule
	 * @link https://angular.io/guide/singleton-services#forroot
	 * @param xsrfConfig - Object containing the configuration (if any) for the XSRF service
	 * @returns a module with providers
	 */
	public static forRoot(xsrfConfig?: StarkXSRFConfig): ModuleWithProviders {
		return {
			ngModule: StarkXSRFModule,
			providers: [
				{ provide: STARK_XSRF_CONFIG, useValue: xsrfConfig },
				{ provide: STARK_XSRF_SERVICE, useClass: StarkXSRFServiceImpl },
				{ provide: HTTP_INTERCEPTORS, useClass: StarkXSRFHttpInterceptor, multi: true } // Add the StarkXSRFHttpInterceptor as an Http interceptor to handle missing XSRF token
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
		parentModule: StarkXSRFModule,
		@Inject(STARK_XSRF_SERVICE) xsrfService: StarkXSRFService,
		appInitStatus: ApplicationInitStatus
	) {
		if (parentModule) {
			throw new Error("StarkXSRFModule is already loaded. Import it in the AppModule only");
		}

		// this logic cannot be executed in an APP_INITIALIZER factory because the StarkXsrfService uses the StarkLoggingService
		// which needs the "logging" state to be already defined in the Store (which NGRX defines internally via APP_INITIALIZER factories :p)
		from(appInitStatus.donePromise).subscribe(() => {
			xsrfService.pingBackends();
		});
	}
}
