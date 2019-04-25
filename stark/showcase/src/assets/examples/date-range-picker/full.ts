import { Component, OnInit, Inject } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkDatePickerFilter } from "@nationalbankbelgium/stark-ui";

@Component({
	selector: "showcase-demo-date-range-picker",
	templateUrl: "./date-range-picker.component.html"
})
export class DateRangePickerComponent implements OnInit {
	public startDate: Date;
	public endDate: Date;
	public minDate: Date;
	public maxDate: Date;
	public customDateFilter: StarkDatePickerFilter;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.startDate = new Date();
		this.endDate = new Date();
		this.endDate.setMonth(this.endDate.getMonth() + 1);
		this.minDate = new Date();
		this.maxDate = new Date();
		this.maxDate.setMonth(this.maxDate.getMonth() + 6);

		this.customDateFilter = (date: Date): boolean => {
			const day: number = date.getDay();
			return day !== 0;
		};
	}

	public onDateChanged(event: Object): void {
		this.logger.debug(event);
	}
}
