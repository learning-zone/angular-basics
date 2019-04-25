import {Component, HostBinding, Inject, OnInit, ViewEncapsulation} from "@angular/core";
import {
	STARK_LOGGING_SERVICE,
	STARK_ROUTING_SERVICE,
	starkAppExitStateName,
	starkAppInitStateName,
	StarkLoggingService,
	StarkRoutingService
} from "@nationalbankbelgium/stark-core";

/**
 * Name of the component
 */
const componentName: string = "stark-app-container";

@Component({
	selector: "stark-app-container",
	templateUrl: "./app-container.component.html",
	encapsulation: ViewEncapsulation.None
})
export class StarkAppContainerComponent implements OnInit {
	/**
	 * Adds class="stark-app-container" attribute on the host component
	 */
	@HostBinding("class")
	public class: string = componentName;

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 * @param routingService - The routing service of the application
	 */
	public constructor(
		@Inject(STARK_LOGGING_SERVICE) private logger: StarkLoggingService,
		@Inject(STARK_ROUTING_SERVICE) private routingService: StarkRoutingService
	) {}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": component initialized.");
	}

	/**
	 * Check if the current state is a "session-ui" state (with "starkAppInit" or "starkAppExit" as parent state name)
	 */
	public isSessionUIState(): boolean {
		return (
			this.routingService.isCurrentUiStateIncludedIn(starkAppInitStateName + ".**") ||
			this.routingService.isCurrentUiStateIncludedIn(starkAppExitStateName + ".**")
		);
	}
}
