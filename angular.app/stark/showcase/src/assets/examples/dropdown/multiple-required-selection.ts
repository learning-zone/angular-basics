import { Component, OnInit } from "@angular/core";

@Component({
	selector: "showcase-demo-dropdown",
	templateUrl: "./multiple-required-selection.html"
})
export class DropdownMultipleRequiredSelectionComponent implements OnInit {
	public selectedRequiredServices: string[];

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

	public multipleServicesRequiredDropdownOnChange(selectedValues: string[]): void {
		this.selectedRequiredServices = selectedValues;
	}
}
