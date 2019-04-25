import { NgModule, ModuleWithProviders, SkipSelf, Optional } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import {
	STARK_TOAST_NOTIFICATION_SERVICE,
	StarkToastNotificationServiceImpl,
	STARK_TOAST_NOTIFICATION_OPTIONS,
	StarkToastNotificationOptions
} from "./services";
import { StarkToastNotificationComponent } from "./components";
@NgModule({
	declarations: [StarkToastNotificationComponent],
	imports: [BrowserModule, MatButtonModule, MatIconModule, MatSnackBarModule, TranslateModule],
	exports: [StarkToastNotificationComponent],
	entryComponents: [StarkToastNotificationComponent] // More infos about entryComponents : https://github.com/angular/material2/issues/3002
})
export class StarkToastNotificationModule {
	/**
	 * Instantiates the services only once since they should be singletons
	 * so the forRoot() should be called only by the AppModule
	 * @link https://angular.io/guide/singleton-services#forroot
	 * @returns a module with providers
	 */
	public static forRoot(defaultToastNotificationOptions?: StarkToastNotificationOptions): ModuleWithProviders {
		return {
			ngModule: StarkToastNotificationModule,
			providers: [
				{ provide: STARK_TOAST_NOTIFICATION_SERVICE, useClass: StarkToastNotificationServiceImpl },
				{ provide: STARK_TOAST_NOTIFICATION_OPTIONS, useValue: defaultToastNotificationOptions }
			]
		};
	}

	/**
	 * Prevent this module from being re-imported
	 * @link https://angular.io/guide/singleton-services#prevent-reimport-of-the-coremodule
	 * @param the parent module
	 */
	public constructor(
		@Optional()
		@SkipSelf()
		parentModule: StarkToastNotificationModule
	) {
		if (parentModule) {
			throw new Error("StarkToastNotificationModule is already loaded. Import it in the AppModule only");
		}
	}
}
