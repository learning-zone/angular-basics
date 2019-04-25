//tslint:disable:no-big-function no-commented-code completed-docs
import { Component, DebugElement, ViewChild, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { STARK_LOGGING_SERVICE } from "@nationalbankbelgium/stark-core";
import { StarkDropdownComponent } from "./dropdown.component";
import { CommonModule } from "@angular/common";
import { By } from "@angular/platform-browser";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
@Component({
	selector: `host-component`,
	template: `
		<stark-dropdown [options]="options" [label]="label" [placeholder]="placeholder"
						[value]="value" [selectionChange]="dropdownSelectionChanged"
						[dropdownId]="dropdownId"></stark-dropdown>`
})
class TestHostComponent {
	@ViewChild(StarkDropdownComponent)
	public dropdownComponent: StarkDropdownComponent;
	public dropdownId: string;
	public header?: string;
	public label?: string;
	public options: any[];
	public placeholder: string;
	public value: any | any[];
	public dropdownSelectionChanged: Function;
	public required?: boolean;
}

describe("DropdownComponent", () => {
	let component: StarkDropdownComponent;
	let hostComponent: TestHostComponent;
	let hostFixture: ComponentFixture<TestHostComponent>;

	const simpleOptions: string[] = ["1", "2", "3"];
	const dropdownLabel: string = "dropdown label";
	const dropdownPlaceholder: string = "dropdown placeholder";
	const dropdownValue: string = "dropdownValue";
	const dropdownId: string = "dropdownId";
	const dropdownOnChange: any = () => {
		return "dummyDropdownOnChange";
	};

	beforeEach(async(() => {
		return TestBed.configureTestingModule({
			imports: [CommonModule, MatSelectModule, MatOptionModule, FormsModule, TranslateModule.forRoot(), NoopAnimationsModule],
			declarations: [StarkDropdownComponent, TestHostComponent],
			providers: [{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() }, TranslateService],
			schemas: [NO_ERRORS_SCHEMA] // tells the Angular compiler to ignore unrecognized elements and attributes (selectionChange)
		}).compileComponents();
	}));

	// Inject the mocked services
	beforeEach(() => {
		hostFixture = TestBed.createComponent(TestHostComponent);
		hostComponent = hostFixture.componentInstance;
		hostFixture.detectChanges();
		component = hostComponent.dropdownComponent;

		hostComponent.dropdownId = dropdownId;
		hostComponent.label = dropdownLabel;
		hostComponent.dropdownSelectionChanged = dropdownOnChange;
		hostComponent.options = simpleOptions;
		hostComponent.placeholder = dropdownPlaceholder;
		hostComponent.value = dropdownValue;

		hostFixture.detectChanges();
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(hostFixture).toBeDefined();
			expect(component).toBeDefined();
			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();
		});
	});

	describe("options defined as array of simple types", () => {
		it("should render the appropriate content", () => {
			const dropdownComponent: DebugElement = hostFixture.debugElement.query(By.directive(StarkDropdownComponent));
			expect(dropdownComponent.nativeElement.getAttribute("ng-reflect-value")).toBe(dropdownValue); // ngModel is replaced by Angular to "ng-reflect-value"
			expect(hostFixture.nativeElement.innerHTML).toContain("<mat-select");
			const dropdownElement: DebugElement = dropdownComponent.query(By.css("mat-select"));
			expect(dropdownElement.nativeElement.getAttribute("ng-reflect-placeholder")).toBe(dropdownPlaceholder);
			expect(dropdownElement.nativeElement.getAttribute("ng-reflect-id")).toBe(dropdownId);

			//FIXME find a solution to make those tests work again
			// Angular now does not diplay the option of mat-select in the html file, which means that we have no solution to test those options

			// expect(dropdownElement.html()).toContain("<md-option");
			// const optionElements: IAugmentedJQuery = UnitTestingUtils.getElementsByTagName(element, "md-option");
			// expect(optionElements.length).toBe(3);
			//
			// for (let index: number = 0; index < optionElements.length; index++) {
			// 	const option: IAugmentedJQuery = angular.element(optionElements[index]);
			// 	expect(option.attr("ng-value")).toBe("$ctrl.optionsAreSimpleTypes ? option : option[$ctrl.optionIdProperty]");
			// 	expect(option.attr("value")).toBe(String(index + 1));
			// 	expect(option.text().trim()).toBe(String(index + 1));
			// }
		});
	});

	// FIXME Reenable this test
	// the only thing changing from this test to the previous one are the options.
	// We should fix that to make both test more relevant.

	// describe("options defined as array of objects", () => {
	// 	it("should render the appropriate content", () => {
	// 		expect(component).toContain("<label");
	// 		const labelElement: HTMLElement = hostFixture.debugElement.nativeElement.querySelector("label");
	// 		expect(labelElement.tagName).toBe(dropdownLabel);
	// 		expect(component).toContain("<mat-select");
	// 		const dropdownElement: HTMLElement = hostFixture.debugElement.nativeElement.querySelector("mat-select");
	// 		expect(dropdownElement.getAttribute("id")).toBe(dropdownId);
	// 		expect(dropdownElement.getAttribute("[(ngModel)]")).toBe("value");
	// 		expect(dropdownElement.getAttribute("placeholder")).toBe(dropdownPlaceholder);
	// 		const headerElement: HTMLElement = hostFixture.debugElement.nativeElement.querySelector("mat-select-header");
	// 		expect(headerElement.tagName.trim()).toBe(dropdownHeader);

	// expect(dropdownElement.html()).toContain("<md-option");
	// const optionElements: IAugmentedJQuery = UnitTestingUtils.getElementsByTagName(element, "md-option");
	// expect(optionElements.length).toBe(3);
	//
	// for (let index: number = 0; index < optionElements.length; index++) {
	// 	const option: IAugmentedJQuery = angular.element(optionElements[index]);
	// 	expect(option.attr("ng-value")).toBe("$ctrl.optionsAreSimpleTypes ? option : option[$ctrl.optionIdProperty]");
	// 	expect(option.attr("value")).toBe("option_" + (index + 1));
	// 	expect(option.text().trim()).toBe("this is option " + (index + 1));
	// }
	// 	});
	// });

	//TODO reenable if label still needed
	// describe("label", () => {
	// 	it("should be displayed when label is defined", () => {
	// 		const labelElement: DebugElement = hostFixture.debugElement.query(By.css("label"));
	// 		expect(labelElement).not.toBeNull();
	// 	});
	//
	// 	it("should be hidden when label is undefined", () => {
	// 		hostComponent.label = undefined;
	// 		hostFixture.detectChanges();
	// 		const labelElement: DebugElement = hostFixture.debugElement.query(By.css("label"));
	// 		expect(labelElement).toBeNull();
	// 	});
	//
	// 	it("should be hidden when label is an empty string", () => {
	// 		hostComponent.label = "";
	// 		hostFixture.detectChanges();
	// 		const labelElement: DebugElement = hostFixture.debugElement.query(By.css("label"));
	// 		expect(labelElement).toBeNull();
	// 	});
	// });

	//FIXME reenable those tests as soon as a solution to replace the md-select-header as been found: https://github.com/angular/material2/pull/7835
	//
	// describe("header", () => {
	// 	it("should be added to the DOM when header is defined", () => {
	// 		expect(dropdownHeader.length).toBe(1);
	// 	});
	//
	// 	it("should not be added to the DOM when header is undefined", () => {
	// 		hostComponent.header = undefined;
	// 		hostFixture.detectChanges();
	// 		expect(dropdownHeader.length).toBe(0);
	// 	});
	//
	// 	it("should not be added to the DOM when header is an empty string", () => {
	// 		hostComponent.header = "";
	// 		hostFixture.detectChanges();
	// 		expect(dropdownHeader.length).toBe(0);
	// 	});
	// });

	// FIXME reenable and adapt those tests once the solution for the option has been found
	// describe("multiple-select", () => {
	// 	const checkboxSelector: string = ".mat-container > .mat-icon";
	//
	// 	it("should display a checkbox for every option in the dropdown when multiple-select is set to 'true'", () => {
	// 		hostComponent.dropdownComponent.multipleSelect = "true";
	// 		// simulating the scope life cycle (so the watchers and bindings are executed)
	// 		hostFixture.detectChanges();
	//
	//
	// 		const optionElements: DebugElement[] = hostFixture.debugElement.queryAll(hostFixture.debugElement[0]);
	//
	// 		expect(optionElements.length).toBe(3);
	// 	});

	// it("should display a checkbox for every option in the dropdown when multiple-select has no value defined", () => {
	// 	// $scope.multipleSelect = undefined;
	//
	// 	element = $compile("<stark-dropdown " +
	// 		"options='options' " +
	// 		"option-id-property='{{ optionIdProperty }}' " +
	// 		"option-label-property='{{ optionLabelProperty }}' " +
	// 		"label='{{ label }}' " +
	// 		"header='{{ header }}' " +
	// 		"placeholder='{{ placeholder }}' " +
	// 		"value='value' " +
	// 		"on-value-change='onValueChange()' " +
	// 		"dropdown-id='{{ dropdownId }}' " +
	// 		"dropdown-name='{{ dropdownName }}' " +
	// 		"multiple-select" +
	// 		"></stark-dropdown>")($scope);
	// 	// simulating the scope life cycle (so the watchers and bindings are executed)
	// 	hostFixture.detectChanges();
	//
	// 	const optionElements: NodeListOf<Element> = StarkDOMUtil.getElementsBySelector(element[0], "md-option > " + checkboxSelector);
	// 	expect(optionElements.length).toBe($scope.options.length);
	// });

	// it("should NOT render the checkboxes if multiple-select is to any value other than 'true'", () => {
	// 	hostComponent.multipleSelect = "whatever";
	//
	// 	element = $compile("<stark-dropdown " +
	// 		"options='options' " +
	// 		"option-id-property='{{ optionIdProperty }}' " +
	// 		"option-label-property='{{ optionLabelProperty }}' " +
	// 		"label='{{ label }}' " +
	// 		"header='{{ header }}' " +
	// 		"placeholder='{{ placeholder }}' " +
	// 		"value='value' " +
	// 		"on-value-change='onValueChange()' " +
	// 		"dropdown-id='{{ dropdownId }}' " +
	// 		"dropdown-name='{{ dropdownName }}' " +
	// 		"multiple-select='{{ multipleSelect }}'" +
	// 		"></stark-dropdown>")($scope);
	// 	// simulating the scope life cycle (so the watchers and bindings are executed)
	// 	$scope.$digest();
	//
	// 	const optionElements: NodeListOf<Element> = StarkDOMUtil.getElementsBySelector(element[0], "md-option > " + checkboxSelector);
	// 	expect(optionElements.length).toBe(0);
	// });
	// });

	describe("setDefaultBlank", () => {
		it("should set 'defaultBlank' to false when it is not set or it is set to false", () => {
			component.defaultBlank = false;
			component.setDefaultBlank();
			expect(component.defaultBlank).toBe(false);

			component.defaultBlank = <any>undefined;
			component.setDefaultBlank();
			expect(component.defaultBlank).toBe(false);
		});

		it("should set 'defaultBlank' to false when 'required' is true", () => {
			component.defaultBlank = <any>undefined;
			component.required = true;
			component.setDefaultBlank();
			expect(component.defaultBlank).toBe(false);
		});
	});

	describe("isMultipleSelect", () => {
		it("should return TRUE in case multipleSelect is set to 'true' or empty string", () => {
			component.multipleSelect = "true";
			let isMultipleSelect: boolean = component.isMultipleSelect();
			expect(isMultipleSelect).toBe(true);

			component.multipleSelect = "";
			isMultipleSelect = component.isMultipleSelect();
			expect(isMultipleSelect).toBe(true);
		});

		it("should return FALSE in case multipleSelect is set to any other value other than 'true' or empty string", () => {
			component.multipleSelect = "whatever";
			let isMultipleSelect: boolean = component.isMultipleSelect();
			expect(isMultipleSelect).toBe(false);

			component.multipleSelect = undefined;
			isMultipleSelect = component.isMultipleSelect();
			expect(isMultipleSelect).toBe(false);
		});
	});
});
