import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
const componentName: string = "demo-breadcrumb";

/**
 * Demo Breadcrumb with no input component page
 */
@Component({
	selector: "demo-breadcrumb",
	templateUrl: "./breadcrumb-no-input.html"
})
export class BreadcrumbNoInputComponent implements OnInit {
	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": controller initialized");
	}
}
