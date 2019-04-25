import { Component } from "@angular/core";

@Component({
	selector: "showcase-demo-dropdown",
	templateUrl: "./single-blank-selection.html"
})
export class DropdownSingleBlankSelectionComponent {
	public selectedNumber: string;

	public numberDropdownOnChange(selectedValue: string): void {
		this.selectedNumber = selectedValue;
	}
}
