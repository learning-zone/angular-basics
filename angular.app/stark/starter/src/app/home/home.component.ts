import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
/**
 * @ignore
 */
@Component({
	selector: "home",
	styleUrls: ["./home.component.scss"],
	templateUrl: "./home.component.html"
})
/**
 * @ignore
 */
export class HomeComponent implements OnInit {
	/**
	 * @ignore
	 */
	public constructor(@Inject(STARK_LOGGING_SERVICE) public loggingService: StarkLoggingService) {}

	/**
	 * Triggered at home component's initialization
	 */
	public ngOnInit(): void {
		this.loggingService.debug("Hello from the `Home` component");
	}
}
