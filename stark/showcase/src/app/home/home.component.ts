import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkErrorImpl, StarkLoggingService } from "@nationalbankbelgium/stark-core";

@Component({
	selector: "home", // <home></home>
	styleUrls: ["./home.component.scss"],
	templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
	public constructor(@Inject(STARK_LOGGING_SERVICE) public loggingService: StarkLoggingService) {}

	public ngOnInit(): void {
		this.loggingService.debug("hello from `Home` component");
	}

	public logError(): void {
		try {
			throw new Error("Invoked error");
		} catch (error) {
			this.loggingService.error("Logging the Error", error);
		}
	}

	public logStarkError(): void {
		try {
			throw new Error("Invoked error");
		} catch (error) {
			this.loggingService.error("Logging the StarkError", new StarkErrorImpl(error));
		}
	}
}
