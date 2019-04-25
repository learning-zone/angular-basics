import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewEncapsulation } from "@angular/core";
import { STARK_LOGGING_SERVICE, STARK_ROUTING_SERVICE, StarkLoggingService, StarkRoutingService } from "@nationalbankbelgium/stark-core";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";

/**
 * Name of the component
 */
const componentName: string = "stark-app-logo";

/**
 * Component to display the application's logo
 */
@Component({
	selector: "stark-app-logo",
	templateUrl: "./app-logo.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: componentName
	}
})
export class StarkAppLogoComponent extends AbstractStarkUiComponent implements OnInit {
	/**
	 * Params object to be passed to the UI router state defined as homeState.
	 */
	@Input()
	public homeStateParams?: { [property: string]: any };

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 * @param routingService - The routing service of the application
	 * @param renderer - Angular Renderer wrapper for DOM manipulations.
	 * @param elementRef - Reference to the DOM element where this directive is applied to.
	 */
	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_ROUTING_SERVICE) public routingService: StarkRoutingService,
		protected renderer: Renderer2,
		protected elementRef: ElementRef
	) {
		super(renderer, elementRef);
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": component initialized");
	}

	/**
	 * Handles the event when a click is made on the logo
	 * @param $event - The handled event
	 */
	public logoClickHandler($event: Event): void {
		// cancel the event otherwise Angular triggers a full page reload :(
		$event.preventDefault();
		this.routingService.navigateToHome(this.homeStateParams);
	}
}
