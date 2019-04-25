import { Component } from "@angular/core";

@Component({
	selector: "showcase-demo-collapsible",
	styleUrls: ["./demo-collapsible.component.scss"],
	templateUrl: "./demo-collapsible.component.html"
})
export class DemoCollapsibleComponent {
	public collapsed: boolean[] = [false, true, false, true, false, false, false];

	public constructor() {
		// empty constructor
	}

	public toggleCollapsible(nb: number): void {
		this.collapsed[nb] = !this.collapsed[nb];
	}
}
