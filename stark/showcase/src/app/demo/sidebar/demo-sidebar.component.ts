import { Component, Inject } from "@angular/core";
import { STARK_APP_SIDEBAR_SERVICE, StarkAppSidebarService } from "@nationalbankbelgium/stark-ui";

@Component({
	selector: "showcase-demo-sidebar",
	styleUrls: ["./demo-sidebar.component.scss"],
	templateUrl: "./demo-sidebar.component.html"
})
export class DemoSidebarComponent {
	public constructor(@Inject(STARK_APP_SIDEBAR_SERVICE) public sidebarService: StarkAppSidebarService) {}

	public openMenu(): void {
		this.sidebarService.openMenu();
	}

	public openLeftSidebar(): void {
		this.sidebarService.openLeft();
	}

	public openRightSidebar(): void {
		this.sidebarService.openRight();
	}
}
