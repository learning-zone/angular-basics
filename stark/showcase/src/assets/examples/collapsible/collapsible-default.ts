import { Component } from "@angular/core";

@Component({
	selector: "showcase-demo-collapsible",
	templateUrl: "./demo-collapsible.component.html"
})
export class CollapsibleExample {
	public collapsed: boolean = false;

	public constructor() {
		// empty constructor
	}

	public toggleCollapsible(): void {
		this.collapsed = !this.collapsed;
	}
}
