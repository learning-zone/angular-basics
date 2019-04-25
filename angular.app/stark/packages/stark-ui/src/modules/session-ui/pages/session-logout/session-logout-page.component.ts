import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";

import { STARK_APP_CONFIG, STARK_LOGGING_SERVICE, StarkApplicationConfig, StarkLoggingService } from "@nationalbankbelgium/stark-core";

/**
 * Name of the component
 */
const componentName: string = "stark-session-logout-page";

/**
 * Session logout page smart component
 */
@Component({
	selector: "stark-session-logout-page",
	templateUrl: "./session-logout-page.component.html",
	encapsulation: ViewEncapsulation.None,
	host: {
		class: componentName
	}
})
export class StarkSessionLogoutPageComponent implements OnInit {
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
	public logon(): void {
		// reload app base URL (stark will redirect to the Login/Preloading page)
		window.open(this.appConfig.baseUrl, "_self");
	}
}
