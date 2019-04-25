import { Component, Inject, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { StarkLoggingService, STARK_LOGGING_SERVICE } from "@nationalbankbelgium/stark-core";
/**
 * @ignore
 */
@Component({
	selector: "about",
	styles: [``],
	templateUrl: "./about.component.html"
})
/**
 * @ignore
 */
export class AboutComponent implements OnInit {
	/**
	 * @ignore
	 */
	@Input()
	public resolvedData: Observable<any>;
	/**
	 * @ignore
	 */
	@Input()
	public paramData: any;

	/**
	 * @ignore
	 */
	public constructor(@Inject(STARK_LOGGING_SERVICE) public loggingService: StarkLoggingService) {}

	/**
	 * Triggered on the component's initialization
	 */
	public ngOnInit(): void {
		this.loggingService.debug("hello from the `About` component");
	}
}
