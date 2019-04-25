import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkPaginateEvent, StarkPaginationConfig } from "@nationalbankbelgium/stark-ui";

@Component({
	selector: "demo-pagination",
	templateUrl: "./demo-pagination.component.html",
	styleUrls: ["./demo-pagination.component.scss"]
})
export class DemoPaginationComponent implements OnInit {
	public paginationSimpleConfig: StarkPaginationConfig;
	public paginationExtendedConfig: StarkPaginationConfig;
	public paginationAdvancedConfig: StarkPaginationConfig;
	public paginationCompactConfig: StarkPaginationConfig;
	public paginateEventSimple: string;
	public paginateEventExtended: string;
	public paginateEventAdvanced: string;
	public paginateEventCompact: string;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.paginationSimpleConfig = {
			totalItems: 20,
			page: 1,
			itemsPerPage: 10,
			itemsPerPageOptions: [2, 4, 6, 8, 10, 20]
		};

		this.paginationExtendedConfig = {
			totalItems: 20,
			page: 1,
			itemsPerPage: 2,
			itemsPerPageOptions: [2, 4, 6, 8, 10, 20],
			isExtended: true
		};

		this.paginationAdvancedConfig = {
			totalItems: 20,
			page: 1,
			itemsPerPage: 4,
			itemsPerPageOptions: [2, 4, 6, 8, 10, 20],
			itemsPerPageIsPresent: true,
			pageInputIsPresent: false,
			pageNavIsPresent: true
		};

		this.paginationCompactConfig = {
			totalItems: 20,
			page: 1,
			itemsPerPage: 4,
			itemsPerPageOptions: [2, 4, 6, 8, 10, 20]
		};
	}

	public onPaginationChange(paginateEvent: StarkPaginateEvent, config: "simple" | "extended" | "advanced" | "compact"): void {
		switch (config) {
			case "extended":
				this.paginateEventExtended = JSON.stringify(paginateEvent);
				break;
			case "advanced":
				this.paginateEventAdvanced = JSON.stringify(paginateEvent);
				break;
			case "compact":
				this.paginateEventCompact = JSON.stringify(paginateEvent);
				break;
			default:
				this.paginateEventSimple = JSON.stringify(paginateEvent);
				break;
		}
	}
}
