import {
	Component,
	EventEmitter,
	Inject,
	Input,
	OnChanges,
	OnInit,
	Output,
	SimpleChanges,
	ViewEncapsulation,
	ElementRef,
	Renderer2
} from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";

/**
 * Name of the component
 */
const componentName: string = "stark-dropdown";

/**
 * Component to display dropdown list based on the options passed as parameters. The dropdown component is based
 * on the Angular Material MatSelect.
 */
@Component({
	selector: "stark-dropdown",
	templateUrl: "./dropdown.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: componentName
	}
})
export class StarkDropdownComponent extends AbstractStarkUiComponent implements OnInit, OnChanges, OnInit {
	/**
	 * If the dropdown will contain a default blank (optional)
	 */
	@Input()
	public defaultBlank?: boolean;

	/**
	 * HTML "id" attribute of the element.
	 */
	@Input()
	public dropdownId: string;

	/**
	 * HTML "name" attribute of the element.
	 */
	@Input()
	public dropdownName: string;

	/**
	 * header Text to be displayed as the dropdown's header. Such header will be shown at the top of the
	 * dropdown options list(dynamically translated via the $translate service if the provided text is defined in the translation keys).
	 */
	// TODO reenable once a solution for the replacement of md-select-header as been found
	// @Input()
	// public header?: string;
	/**
	 * Whether the dropdown is disabled (optional)
	 */
	@Input()
	public isDisabled?: boolean = false;

	/**
	 * Text to be displayed as the dropdown's label (dynamically translated via the $translate service if
	 * the provided text is defined in the translation keys).
	 */
	@Input()
	public label?: string;

	/**
	 * Allows multiple option selection. Setting the attribute to "true" or empty
	 * will enable this feature. (optional)
	 */
	@Input()
	public multipleSelect?: string;

	/**
	 * Array of options to be included in the dropdown list. This parameter is a one-way
	 * binding (one-directional).
	 */
	@Input()
	public options: any[];

	/**
	 * Property name to be used as id of the options defined. If this parameter as
	 * well as the optionLabelProperty are omitted, then the options parameter is considered to be an array of simple types. (optional)
	 */
	@Input()
	public optionIdProperty?: string;

	/**
	 * Property name to be used as label of the options defined (dynamically translated via
	 * the $translate service if the provided text is defined in the translation keys). If this parameter as well as the
	 * optionIdProperty are omitted, then the options parameter is considered to be an array of simple types. (optional)
	 */
	@Input()
	public optionLabelProperty?: string;

	/**
	 * Text to be displayed as the dropdown's placeholder (dynamically translated via the $translate
	 * service if the provided text is defined in the translation keys).
	 */
	@Input()
	public placeholder: string;

	/**
	 * If the dropdown is required or not. by default, the dropdown is not required
	 */
	@Input()
	public required: boolean = false;

	/**
	 * Source object to be bound to the dropdown ngModel.
	 */
	@Input()
	public value: any | any[];

	/**
	 * This will emit the newly selected value.
	 */
	@Output()
	public dropdownSelectionChanged: EventEmitter<any> = new EventEmitter<any>();

	/**
	 * @ignore
	 * @internal
	 */
	public optionsAreSimpleTypes: boolean;

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
		this.optionsAreSimpleTypes = this.areSimpleTypes();
		this.setDefaultBlank();
		super.ngOnInit();
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnChanges(changesObj: SimpleChanges): void {
		if (changesObj["optionIdProperty"] || changesObj["optionLabelProperty"]) {
			this.optionsAreSimpleTypes = this.areSimpleTypes();
		}
	}

	/**
	 * Called whenever the selection of the dropdown changes
	 */
	public selectionChanged(): void {
		this.dropdownSelectionChanged.emit(this.value);
	}

	/**
	 * Whether the type of the option elements is a primitive type (string, number, boolean...)
	 * In case none of the optionId and optionLabel parameters are provided, then a simple data types array is assumed
	 */
	public areSimpleTypes(): boolean {
		return !(
			typeof this.optionIdProperty !== "undefined" &&
			this.optionIdProperty !== "" &&
			typeof this.optionLabelProperty !== "undefined" &&
			this.optionLabelProperty !== ""
		);
	}

	/**
	 * set blank by default in the dropdown component
	 */
	public setDefaultBlank(): void {
		// defaultBlank is by default false, you should explicitly set to true to add it
		if (!this.defaultBlank) {
			this.defaultBlank = false;
		}
		// if dropdown is required you should not be able to select blank
		if (this.required) {
			this.defaultBlank = false;
		}
	}

	/**
	 * states if the dropdown can handle multiple selection or not.
	 * @returns whether the mat-select attribute is multiple of not
	 */
	public isMultipleSelect(): boolean {
		return this.multipleSelect === "true" || this.multipleSelect === "";
	}

	/**
	 * Return the id of the option or the option itself if it is a simple type.
	 * @param option - the option which id we want to retrieve
	 * @returns the value to return
	 */
	public getOptionValue(option: any): any {
		return this.optionsAreSimpleTypes ? option : option[<string>this.optionIdProperty];
	}

	/**
	 * Return the label of the option or the option itself if it is a simple type.
	 * @param option - the option which value we want to retrieve
	 * @returns the value to return
	 */
	public getOptionLabel(option: any): any {
		const optionLabel: string = this.optionsAreSimpleTypes ? option : option[<string>this.optionLabelProperty];
		return optionLabel.toString(); // IMPORTANT: the label should be a STRING otherwise the translate directive fails
	}

	/**
	 * @ignore
	 */
	public trackItemFn(_index: number, item: any): string {
		// FIXME: cannot call areSimpleTypes() from the component since this track function gets no context
		return item;
	}
}
