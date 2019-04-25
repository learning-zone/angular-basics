import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatDatepicker, MatDatepickerInput, MatDatepickerInputEvent } from "@angular/material";
import moment from "moment";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";

export type StarkDatePickerFilter = "OnlyWeekends" | "OnlyWeekdays" | ((date: Date) => boolean) | undefined;

/**
 * Name of the component
 */
const componentName: string = "stark-date-picker";

/**
 * Component to display the stark date-picker
 */
@Component({
	selector: "stark-date-picker",
	templateUrl: "./date-picker.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: componentName
	}
})
export class StarkDatePickerComponent extends AbstractStarkUiComponent implements OnInit {
	/**
	 * Source Date to be bound to the datepicker model
	 */
	@Input()
	public date: Date;

	/**
	 * Filter function or a string
	 * Whenever this value is changed, we set the dateFilter
	 */
	@Input()
	public get dateFilter(): StarkDatePickerFilter {
		return this._dateFilter;
	}

	public set dateFilter(value: StarkDatePickerFilter) {
		this._dateFilter = value;
		if (this._dateFilter === "OnlyWeekends") {
			this._dateFilter = this.filterOnlyWeekends;
		} else if (this._dateFilter === "OnlyWeekdays") {
			this._dateFilter = this.filterOnlyWeekdays;
		}
	}

	/**
	 * @ignore
	 * @internal
	 */
	private _dateFilter?: StarkDatePickerFilter;

	/**
	 * Whether the datepicker is disabled
	 */
	@Input()
	public isDisabled?: boolean;

	/**
	 * Label to be displayed in the datepicker
	 */
	@Input()
	public label: string;

	/**
	 * Maximum date of the date picker
	 */
	@Input()
	public maxDate: Date;

	/**
	 * Minimum date of the date picker
	 */
	@Input()
	public minDate: Date;

	/**
	 * id attribute of the form field wrapping the mat-datepicker
	 * id attribute followed by "-input" of the mat-datepicker-input
	 *
	 */
	@Input()
	public pickerId: string = "";

	/**
	 * HTML "name" attribute of the element.
	 */
	@Input()
	public pickerName: string = "";

	/**
	 * Output that will emit a specific date whenever the selection has changed
	 */
	@Output()
	public dateChanged: EventEmitter<Date> = new EventEmitter<Date>();

	/**
	 * Reference to the MatDatepicker embedded in this component
	 */
	@ViewChild(MatDatepicker)
	public picker: MatDatepicker<any>;

	/**
	 * Reference to the MatDatepickerInput embedded in this component
	 */
	@ViewChild(MatDatepickerInput)
	public pickerInput: MatDatepickerInput<any>;

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
	 * Wrap the dateFilter function
	 * We use the MatMomentDateModule, so the MatDatepicker will return a moment.Moment object. To keep constitency with the old code, the end user should be able to specify a custom dateFilter accepting a Date object as a parameter
	 * @param momentDate - The date to be checked
	 * @returns Whether the date is filtered or not
	 */
	public dateFilterFnWrapper = (momentDate: moment.Moment): boolean => {
		const date: Date = momentDate.toDate();
		if (typeof this._dateFilter === "function") {
			return this._dateFilter(date);
		}
		return true;
	};

	/**
	 * Filter only the weekend days
	 * @param date - The date to be checked
	 * @returns Whether the date is a weekend day or not
	 */
	public filterOnlyWeekends(date: Date): boolean {
		const day: number = date.getDay();
		return day === 0 || day === 6;
	}

	/**
	 * Filter only the week days
	 * @param date - The date to be checked
	 * @returns Whether the date is a week day or not
	 */
	public filterOnlyWeekdays(date: Date): boolean {
		const day: number = date.getDay();
		return day !== 0 && day !== 6;
	}

	/**
	 * Handle the date changed on mat-datepicker and emit the dateChanged event
	 * @param event - The MatDatepickerInputEvent to re-emit
	 */
	public onDateChange(event: MatDatepickerInputEvent<moment.Moment>): void {
		if (event.value) {
			this.dateChanged.emit(event.value.toDate());
		}
	}
}
