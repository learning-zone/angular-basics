import { Component, Inject, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { RawParams } from "@uirouter/core";
import { delay, take } from "rxjs/operators";

import {
	STARK_LOGGING_SERVICE,
	STARK_ROUTING_SERVICE,
	STARK_USER_SERVICE,
	StarkLoggingService,
	StarkRoutingService,
	StarkUserService
} from "@nationalbankbelgium/stark-core";

/**
 * Name of the component
 */
const componentName: string = "stark-preloading-page";

/**
 * Preloading Page smart component
 */
@Component({
	selector: "stark-preloading-page",
	templateUrl: "./preloading-page.component.html",
	encapsulation: ViewEncapsulation.None,
	host: {
		class: componentName
	}
})
export class StarkPreloadingPageComponent implements OnInit {
	@Input()
	public targetState: string;
	@Input()
	public targetStateParams: RawParams;

	public userFetchingFailed: boolean;
	public correlationId: string;

	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_USER_SERVICE) public userService: StarkUserService,
		@Inject(STARK_ROUTING_SERVICE) public routingService: StarkRoutingService
	) {}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		// the result is delayed for some milliseconds,
		// otherwise the page will show an ugly flickering (if the profile is fetched immediately)
		this.userService
			.fetchUserProfile()
			.pipe(
				take(1), // this ensures that the observable will be automatically unsubscribed after emitting the value
				delay(200)
			)
			.subscribe(
				(/*user: StarkUser*/) => {
					if (this.targetState) {
						this.routingService.navigateTo(this.targetState, this.targetStateParams);
					} else {
						this.routingService.navigateToHome();
					}
				},
				() => {
					this.correlationId = this.logger.correlationId;
					this.userFetchingFailed = true;
				}
			);

		this.logger.debug(componentName + ": component initialized");
	}

	/**
	 * Reload the page through the routingService.
	 */
	public reload(): void {
		this.routingService.reload();
	}
}
