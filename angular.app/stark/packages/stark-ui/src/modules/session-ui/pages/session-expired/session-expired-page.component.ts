import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";

import { STARK_APP_CONFIG, STARK_LOGGING_SERVICE, StarkApplicationConfig, StarkLoggingService } from "@nationalbankbelgium/stark-core";

/**
 * Name of the component
 */
const componentName: string = "stark-session-expired-page";

/**
 * Session expired page smart component
 */
@Component({
	selector: "stark-session-expired-page",
	templateUrl: "./session-expired-page.component.html",
	encapsulation: ViewEncapsulation.None,
	host: {
		class: componentName
	}
})
export class StarkSessionExpiredPageComponent implements OnInit {
	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_APP_CONFIG) public appConfig: StarkApplicationConfig
	) {}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": component initialized");
	}

	/**
	 * Open baseUrl page (defined in the appConfig) in the current window.
	 */
	public reload(): void {
		// reload app base URL (stark will redirect to the Login/Preloading page)
		window.open(this.appConfig.baseUrl, "_self");
	}
}
