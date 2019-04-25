/**
 * Angular 2 decorators and services
 */
import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, STARK_ROUTING_SERVICE, StarkLoggingService, StarkRoutingService } from "@nationalbankbelgium/stark-core";
import { STARK_APP_SIDEBAR_SERVICE, StarkAppSidebarService } from "@nationalbankbelgium/stark-ui";

/**
 * App Component
 * Top Level Component
 */
@Component({
	selector: "app",
	templateUrl: "./app.component.html"
})
/**
 * AppComponent file
 */
export class AppComponent implements OnInit {
	/**
	 * Name of the project
	 */
	public name: string = "Stark Starter";

	public constructor(
		@Inject(STARK_APP_SIDEBAR_SERVICE) public sidebarService: StarkAppSidebarService,
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_ROUTING_SERVICE) public routingService: StarkRoutingService
		) {
		this.routingService.addTransitionHook("ON_SUCCESS", {}, () => {
			this.sidebarService.close();
		});
	}

	/**
	 * Triggered on the component's initialization
	 */
	public ngOnInit(): void {
		this.logger.debug("app: component loaded");
	}

	public openMenu(): void {
		this.sidebarService.openMenu();
	}

	public goHome(): void {
		this.routingService.navigateToHome();
	}
}
