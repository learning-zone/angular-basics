import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";

import {
	STARK_LOGGING_SERVICE,
	STARK_ROUTING_SERVICE,
	STARK_SESSION_CONFIG,
	STARK_SESSION_SERVICE,
	StarkLoggingService,
	StarkRoutingService,
	StarkSessionConfig,
	starkSessionLogoutStateName,
	StarkSessionService
} from "@nationalbankbelgium/stark-core";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";

/**
 * Name of the component
 */
const componentName: string = "stark-app-logout";

/**
 * Component to display the application's logout button
 */
@Component({
	selector: "stark-app-logout",
	templateUrl: "./app-logout.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: componentName
	}
})
export class StarkAppLogoutComponent extends AbstractStarkUiComponent implements OnInit {
	/**
	 * Desired icon of the logout button
	 */
	@Input()
	public icon: "power" | string = "power";

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 * @param routingService - The routing service of the application
	 * @param sessionService - The session service of the application
	 * @param sessionConfig - The configuration of the session module
	 * @param renderer - Angular Renderer wrapper for DOM manipulations.
	 * @param elementRef - Reference to the DOM element where this directive is applied to.
	 */
	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_ROUTING_SERVICE) public routingService: StarkRoutingService,
		@Inject(STARK_SESSION_SERVICE) public sessionService: StarkSessionService,
		@Inject(STARK_SESSION_CONFIG) public sessionConfig: StarkSessionConfig,
		protected renderer: Renderer2,
		protected elementRef: ElementRef
	) {
		super(renderer, elementRef);
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": controller initialized");
	}

	/**
	 * Handles the event when a click is made on the logout button
	 */
	public logout(): void {
		this.sessionService.logout();
		if (
			typeof this.sessionConfig !== "undefined" &&
			typeof this.sessionConfig.sessionLogoutStateName !== "undefined" &&
			this.sessionConfig.sessionLogoutStateName !== ""
		) {
			this.routingService.navigateTo(this.sessionConfig.sessionLogoutStateName);
		} else {
			this.routingService.navigateTo(starkSessionLogoutStateName);
		}
	}
}
