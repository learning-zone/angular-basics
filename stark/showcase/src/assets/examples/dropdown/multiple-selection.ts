import { Component, OnInit } from "@angular/core";

@Component({
	selector: "showcase-demo-dropdown",
	templateUrl: "./multiple-selection.html"
})
export class DropdownMultipleSelectionComponent implements OnInit {
	public selectedServices: string[];

	public serviceDropdownOptions: any[];
	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.serviceDropdownOptions = [
			{ id: "PR", value: "IT application" },
			{ id: "IO", value: "Informatics infrastructure and operations" },
			{ id: "CS", value: "IT customer services" }
		];
	}

	public multipleServicesDropdownOnChange(selectedValues: string[]): void {
		this.selectedServices = selectedValues;
	}
}
