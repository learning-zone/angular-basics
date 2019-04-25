import { Component, OnInit, Inject } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkDatePickerFilter } from "@nationalbankbelgium/stark-ui";

@Component({
	selector: "showcase-demo-date-picker",
	templateUrl: "./date-picker.component.html"
})
export class DatePickerComponent implements OnInit {
	public currentDate: Date;
	public minDate: Date;
	public maxDate: Date;
	public customDateFilter: StarkDatePickerFilter;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.currentDate = new Date();
		this.minDate = new Date("07-01-2017");
		this.maxDate = new Date("07-20-2017");

		this.customDateFilter = (date: Date): boolean => {
			const day: number = date.getDay();
			return day === 3;
		};
	}

	public onDateChanged(date: Date): void {
		this.logger.debug(date);
	}
}
