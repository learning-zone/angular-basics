import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2, ViewEncapsulation } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";

/**
 * Name of the component
 */
const componentName: string = "stark-collapsible";

/**
 * Component to display an accordion around included html using angular material's expansion panel.
 */
@Component({
	selector: "stark-collapsible",
	templateUrl: "./collapsible.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: componentName
	}
})
export class StarkCollapsibleComponent extends AbstractStarkUiComponent implements OnInit {
	/**
	 * ID to set to the collapsible
	 */
	@Input()
	public htmlId: string;

	/**
	 * Icon to use in the header (based on Material Design Icons)
	 */
	@Input()
	public icon: "chevron-right" | string = "chevron-right";

	/**
	 * Boolean value triggering the collapsing of the collapsible
	 */
	@Input()
	public isExpanded: boolean = false;

	/**
	 * Output value giving the collapse state of the collapsible
	 * NOTE : isExpandedChange is used with isExpanded to create a two-way binding (using a banana in the box "[(isExpanded)]" ).
	 * For more info, see : https://angular.io/guide/template-syntax#two-way-binding---
	 */
	@Output()
	public isExpandedChange: EventEmitter<boolean> = new EventEmitter();

	/**
	 * String or translation key that will be displayed in the title part of the header.
	 */
	@Input()
	public titleLabel: string;

	/**
	 * Design options related to the component
	 */
	@Input()
	public iconSpinningEnabled: boolean = false;

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 * @param renderer - Angular Renderer wrapper for DOM manipulations.
	 * @param elementRef - Reference to the DOM element where this directive is applied to.
	 */
	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
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
	 * Switch and triggers the dispatch of the collapse state information.
	 */
	public toggleCollapsible(): void {
		this.isExpanded = !this.isExpanded;
		this.isExpandedChange.emit(this.isExpanded);
	}
}
