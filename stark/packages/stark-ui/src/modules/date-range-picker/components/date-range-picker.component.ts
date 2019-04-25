import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer2, ViewChild, ViewEncapsulation } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import moment from "moment";
import { StarkDatePickerFilter, StarkDatePickerComponent } from "./../../date-picker/components/date-picker.component";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";
import { StarkDateRangePickerEvent } from "./date-range-picker-event.intf";

/**
 * Name of the component
 */
const componentName: string = "stark-date-range-picker";

/**
 * Component to display the stark date-range-picker
 */
@Component({
	selector: "stark-date-range-picker",
	templateUrl: "./date-range-picker.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: componentName
	}
})
export class StarkDateRangePickerComponent extends AbstractStarkUiComponent implements OnInit {
	/**
	 * Filter function or a string
	 * Will be applied to both date-picker
	 */
	@Input()
	public dateFilter?: StarkDatePickerFilter;

	/**
	 * Source Date to be bound to the end datepicker model
	 */
	@Input()
	public endDate?: Date;

	/**
	 * Label to be displayed in the end datepicker
	 */
	@Input()
	public endDateLabel: string = "STARK.DATE_RANGE_PICKER.TO";

	/**
	 * Maximum date of the end date picker
	 */
	@Input()
	public endMaxDate: Date;

	/**
	 * Minimum date of the end date picker
	 */
	@Input()
	public endMinDate: Date;

	/**
	 * Whether the datepickers are disabled
	 */
	@Input()
	public isDisabled?: boolean;

	/**
	 * HTML "name" attribute of the element.
	 */
	@Input()
	public rangePickerId: string = "";

	/**
	 * HTML "name" attribute of the element.
	 */
	@Input()
	public rangePickerName: string = "";

	/**
	 * Source Date to be bound to the start datepicker model
	 */

	@Input()
	public startDate?: Date;

	/**
	 * Label to be displayed in the start datepicker
	 */
	@Input()
	public startDateLabel: string = "STARK.DATE_RANGE_PICKER.FROM";

	/**
	 * Maximum date of the start date picker
	 */
	@Input()
	public startMaxDate: Date;

	/**
	 * Minimum date of the start date picker
	 */
	@Input()
	public startMinDate: Date;

	/**
	 * Output that will emit a specific date whenever the selection has changed
	 */
	@Output()
	public dateRangeChanged: EventEmitter<StarkDateRangePickerEvent> = new EventEmitter<StarkDateRangePickerEvent>();

	/**
	 * Reference to the start datepicker embedded in this component
	 */
	@ViewChild("startPicker")
	public startPicker: StarkDatePickerComponent;

	/**
	 * Reference to the end datepicker embedded in this component
	 */
	@ViewChild("endPicker")
	public endPicker: StarkDatePickerComponent;

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
	 * Handle the date changed on the start datepicker
	 */
	public onDateStartChanged(date: Date): void {
		this.startDate = date;
		this.checkDates();
	}

	/**
	 * Handle the date changed on the end datepicker
	 */
	public onDateEndChanged(date: Date): void {
		this.endDate = date;
		this.checkDates();
	}

	/**
	 * Validate the dates and emit the dateRangeChanged event
	 */
	public checkDates(): void {
		if (moment.isDate(this.startDate) && moment.isDate(this.endDate) && moment(this.endDate).isBefore(this.startDate)) {
			this.logger.error("StarkDateRangePicker: Start Date cannot be lower than End Date. End Date will be cleared");
			this.endDate = undefined;
			this.endPicker.pickerInput.value = undefined;
		}
		this.dateRangeChanged.emit({
			startDate: this.startDate,
			endDate: this.endDate
		});
	}
}
