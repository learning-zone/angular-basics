import { Component, OnInit } from "@angular/core";

@Component({
	selector: "showcase-demo-dropdown",
	templateUrl: "./single-required-selection.html"
})
export class DropdownSingleRequiredSelectionExample implements OnInit {
	public selectedService: string;

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

	public serviceDropdownOnChange(selectedValue: string): void {
		this.selectedService = selectedValue;
	}
}
