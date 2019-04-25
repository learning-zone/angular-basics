import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";
import { StarkBreadcrumbConfig } from "@nationalbankbelgium/stark-ui";
const componentName: string = "demo-breadcrumb";

/**
 * Demo Breadcrumb component page
 */
@Component({
	selector: "demo-breadcrumb",
	templateUrl: "./breadcrumb.component.html"
})
export class DemoBreadcrumbComponent implements OnInit {
	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": controller initialized");
	}

	public breadcrumbConfig: StarkBreadcrumbConfig = {
		breadcrumbPaths: [
			{
				id: "path 1",
				state: "Root ancestor",
				stateParams: { param1: "param 1", param2: "param 2" },
				translationKey: "SHOWCASE.DEMO.BREADCRUMB.ROOT"
			},
			{
				id: "path 1.1",
				state: "Grand-parent",
				stateParams: { param3: "param 3", param4: "param 4" },
				translationKey: "SHOWCASE.DEMO.BREADCRUMB.GRANDPARENT"
			},
			{
				id: "path 1.1.1",
				state: "Parent",
				stateParams: { param5: "param 5", param6: "param 6" },
				translationKey: "SHOWCASE.DEMO.BREADCRUMB.PARENT"
			},
			{
				id: "path 1.1.1.1",
				state: "Child",
				stateParams: { param7: "param 7", param8: "param 8" },
				translationKey: "SHOWCASE.DEMO.BREADCRUMB.CHILD"
			}
		]
	};
}
