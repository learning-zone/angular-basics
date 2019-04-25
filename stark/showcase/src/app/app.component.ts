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
	styleUrls: ["./app.component.css"],
	templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
	public constructor(
		@Inject(STARK_APP_SIDEBAR_SERVICE) public sidebarService: StarkAppSidebarService,
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_ROUTING_SERVICE) public routingService: StarkRoutingService
	) {}

	public ngOnInit(): void {
		this.logger.debug("app: component loaded");
		this.routingService.addTransitionHook("ON_SUCCESS", {}, () => {
			this.sidebarService.close();
		});
	}

	public openMenu(): void {
		this.sidebarService.openMenu();
	}

	public openLeftSidebar(): void {
		this.sidebarService.openLeft();
	}

	public openRightSidebar(): void {
		this.sidebarService.openRight();
	}

	public goHome(): void {
		this.routingService.navigateToHome();
	}
}

/**
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
