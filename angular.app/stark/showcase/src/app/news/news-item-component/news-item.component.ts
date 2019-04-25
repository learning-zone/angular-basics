import { Component, Inject, Input, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
const componentName: string = "news-item-component";

@Component({
	selector: "news-item",
	styleUrls: ["./_news-item.component.scss"],
	templateUrl: "./news-item.component.html"
})
export class NewsItemComponent implements OnInit {
	@Input()
	public release: string;

	@Input()
	public newsDate: string;

	public constructor(@Inject(STARK_LOGGING_SERVICE) public loggingService: StarkLoggingService) {}

	public ngOnInit(): void {
		this.loggingService.debug("hello from `News` component");

		if (typeof this.release === "undefined" || this.release === "") {
			throw new Error(componentName + " please provide the stark release");
		}

		if (typeof this.newsDate === "undefined" || this.newsDate === "") {
			throw new Error(componentName + " please provide a date for the news");
		}
	}
}
