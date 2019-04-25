/* tslint:disable:completed-docs */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from "@angular/core";
import { By } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { STARK_LOGGING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { Observer } from "rxjs";
import { StarkPaginationComponent } from "./pagination.component";
import { StarkPaginateEvent } from "./paginate-event.intf";
import { StarkPaginationConfig } from "./pagination-config.intf";
import { StarkDropdownComponent, StarkDropdownModule } from "../../dropdown";
import { StarkKeyboardDirectivesModule } from "../../keyboard-directives";
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

@Component({
	selector: `host-component`,
	template: `
		<stark-pagination [htmlSuffixId]="htmlSuffixId"
						  [paginationConfig]="paginationConfig">
		</stark-pagination>`
})
class TestHostComponent {
	@ViewChild(StarkPaginationComponent)
	public paginationComponent: StarkPaginationComponent;

	public htmlSuffixId: string;
	public paginationConfig: StarkPaginationConfig;
}

/* tslint:disable:no-big-function no-duplicate-string */
describe("PaginationComponent", () => {
	let hostComponent: TestHostComponent;
	let hostFixture: ComponentFixture<TestHostComponent>;
	let component: StarkPaginationComponent;

	const paginationConfig: StarkPaginationConfig = {
		page: 2,
		itemsPerPage: 4,
		itemsPerPageOptions: [4, 8, 12],
		totalItems: 6,
		isExtended: true
	};

	const htmlSuffixId: string = "testHtmlId";
	const currentPagePrefix: string = "current-page-";
	const itemsPerPagePrefix: string = "items-per-page-";
	const pageNumbersSelector: string = "li.page-numbers";
	const totalPagesSelector: string = "span.total-pages";

	const assertPageNavSelection: Function = (paginationElement: DebugElement, selectedOption: string) => {
		const pageNavElement: DebugElement = paginationElement.query(By.css("ul"));
		const pageNavOptionElements: DebugElement[] = pageNavElement.queryAll(By.css("li"));

		for (const pageNavOption of pageNavOptionElements) {
			if (pageNavOption.properties["value"] === selectedOption) {
				expect(pageNavOption.classes["active"]).toBe(true);
			} else {
				expect(pageNavOption.classes["active"]).toBeFalsy(); // can be undefined or false
			}
		}
	};

	const changeInputValueAndPressEnter: Function = (rootElement: DebugElement, value: string) => {
		const querySelector: string = "div.pagination-enter-page input";
		const pageSelectorInput: DebugElement = rootElement.query(By.css(querySelector));

		(<HTMLInputElement>pageSelectorInput.nativeElement).value = value;
		(<HTMLInputElement>pageSelectorInput.nativeElement).dispatchEvent(new Event("input"));

		const changeEvent: Event = document.createEvent("Event");
		changeEvent.initEvent("change", true, true);
		pageSelectorInput.triggerEventHandler("change", changeEvent);

		const keypressEvent: Event = document.createEvent("Event");
		keypressEvent.initEvent("keypress", true, true);
		keypressEvent["key"] = "Enter";
		pageSelectorInput.triggerEventHandler("keypress", keypressEvent);
	};

	const assertPageInputSelection: Function = (rootElement: DebugElement, selectedOption: string) => {
		const querySelector: string = "div.pagination-enter-page input";
		const pageSelectorInput: DebugElement = rootElement.query(By.css(querySelector));
		expect(pageSelectorInput.properties["value"].toString()).toBe(selectedOption);
	};

	beforeEach(async(() => {
		return TestBed.configureTestingModule({
			imports: [
				FormsModule,
				MatButtonModule,
				MatInputModule,
				MatMenuModule,
				MatPaginatorModule,
				MatTooltipModule,
				NoopAnimationsModule,
				TranslateModule.forRoot(),
				StarkDropdownModule,
				StarkKeyboardDirectivesModule
			],
			declarations: [StarkPaginationComponent, TestHostComponent],
			providers: [{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() }],
			schemas: [NO_ERRORS_SCHEMA] // to avoid errors due to "mat-icon" directive not known (which we don't want to add in these tests)
		}).compileComponents();
	}));

	beforeEach(() => {
		hostFixture = TestBed.createComponent(TestHostComponent);
		hostComponent = hostFixture.componentInstance;
		hostComponent.htmlSuffixId = htmlSuffixId;
		hostFixture.detectChanges();

		component = hostComponent.paginationComponent;
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(hostFixture).toBeDefined();
			expect(component).toBeDefined();

			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();
		});

		it("should NOT have any inputs set", () => {
			expect(component.htmlSuffixId).toBe(htmlSuffixId);
			expect(component.mode).toBeUndefined();
			expect(component.paginationConfig).toBeDefined();
		});

		it("should render the appropriate content in normal mode", () => {
			hostComponent.paginationConfig = {
				page: 2,
				itemsPerPage: 4,
				itemsPerPageOptions: [4, 8, 12],
				totalItems: 10,
				isExtended: false,
				pageNavIsPresent: true,
				pageInputIsPresent: true,
				itemsPerPageIsPresent: true
			};
			hostFixture.detectChanges();

			const pageNavElement: DebugElement = hostFixture.debugElement.query(By.css("ul"));
			expect(pageNavElement).toBeDefined();
			expect(pageNavElement.nativeElement.innerHTML).toContain('<li aria-label="Previous" class="previous"');
			const numberElements: DebugElement[] = pageNavElement.queryAll(By.css(pageNumbersSelector));
			expect(numberElements.length).toBe(0);
			expect(pageNavElement.nativeElement.innerHTML).toContain('<li aria-label="Next" class="next"');

			//Verify pageSelector
			const pageSelector: DebugElement = hostFixture.debugElement.query(By.css("div.pagination-enter-page"));

			const pageSelectorInput: DebugElement = pageSelector.query(By.css("input"));
			expect(pageSelectorInput.properties["id"]).toBe(currentPagePrefix + htmlSuffixId);
			/// expect(pageSelectorInput.attributes["ngModel"]).toBe("paginationInput"); // FIXME: ngModel not included in the element
			expect(pageSelectorInput.attributes["starkRestrictInput"]).toBe("\\d");
			expect(pageSelectorInput.attributes["ng-reflect-on-enter-key-handler"]).toBeDefined(); // starkOnEnterKey directive
			const pageSelectorTotalPages: DebugElement = pageSelector.query(By.css(totalPagesSelector));
			expect(pageSelectorTotalPages.nativeElement.innerHTML).toBe("3");

			//Verify itemsPerPageSelector dropdown
			const itemsPerPageSelector: DebugElement = hostFixture.debugElement.query(By.directive(StarkDropdownComponent));

			// bindings can be checked via the ng-reflect-xxxx attributes
			expect(itemsPerPageSelector.attributes["ng-reflect-options"]).toBe(
				(<number[]>component.paginationConfig.itemsPerPageOptions).join(",")
			);
			expect(itemsPerPageSelector.attributes["ng-reflect-value"]).toBe((<number>component.paginationConfig.itemsPerPage).toString());
			expect(itemsPerPageSelector.attributes["ng-reflect-dropdown-id"]).toBe(itemsPerPagePrefix + htmlSuffixId);
			expect(itemsPerPageSelector.attributes["ng-reflect-dropdown-name"]).toBe(itemsPerPagePrefix + htmlSuffixId);
			/// expect(itemsPerPageSelector.attr("header")).toBe("STARK.PAGINATION.ITEMS_PER_PAGE"); // TODO add a header to the itemsPerPage dropdown
		});

		it("should render the appropriate content in extended mode", () => {
			hostComponent.paginationConfig = {
				page: 2,
				itemsPerPage: 4,
				itemsPerPageOptions: [4, 8, 12],
				totalItems: 10,
				isExtended: true,
				pageNavIsPresent: true,
				pageInputIsPresent: true,
				itemsPerPageIsPresent: true
			};
			hostFixture.detectChanges();

			const pageNavElement: DebugElement = hostFixture.debugElement.query(By.css("ul"));
			expect(pageNavElement).toBeDefined();
			expect(pageNavElement.nativeElement.innerHTML).toContain('<li aria-label="Previous" class="previous"');
			const numberElements: DebugElement[] = pageNavElement.queryAll(By.css(pageNumbersSelector));
			expect(numberElements.length).toBe(3);
			expect(numberElements[0].properties["value"]).toBe("1");
			expect(numberElements[1].properties["value"]).toBe("2");
			expect(numberElements[2].properties["value"]).toBe("3");
			assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
			expect(pageNavElement.nativeElement.innerHTML).toContain('<li aria-label="Next" class="next"');

			//Verify pageSelector
			const pageSelector: DebugElement = hostFixture.debugElement.query(By.css("div.pagination-enter-page"));

			const pageSelectorInput: DebugElement = pageSelector.query(By.css("input"));
			expect(pageSelectorInput.properties["id"]).toBe(currentPagePrefix + htmlSuffixId);
			/// expect(pageSelectorInput.attributes["ngModel"]).toBe("paginationInput"); // FIXME: ngModel not included in the element
			expect(pageSelectorInput.attributes["starkRestrictInput"]).toBe("\\d");
			expect(pageSelectorInput.attributes["ng-reflect-on-enter-key-handler"]).toBeDefined(); // starkOnEnterKey directive
			const pageSelectorTotalPages: DebugElement = pageSelector.query(By.css(totalPagesSelector));
			expect(pageSelectorTotalPages.nativeElement.innerHTML).toBe("3");

			//Verify itemsPerPageSelector dropdown
			const itemsPerPageSelector: DebugElement = hostFixture.debugElement.query(By.directive(StarkDropdownComponent));

			// bindings can be checked via the ng-reflect-xxxx attributes
			expect(itemsPerPageSelector.attributes["ng-reflect-options"]).toBe(
				(<number[]>component.paginationConfig.itemsPerPageOptions).join(",")
			);
			expect(itemsPerPageSelector.attributes["ng-reflect-value"]).toBe((<number>component.paginationConfig.itemsPerPage).toString());
			expect(itemsPerPageSelector.attributes["ng-reflect-dropdown-id"]).toBe(itemsPerPagePrefix + htmlSuffixId);
			expect(itemsPerPageSelector.attributes["ng-reflect-dropdown-name"]).toBe(itemsPerPagePrefix + htmlSuffixId);
			/// expect(itemsPerPageSelector.attr("header")).toBe("STARK.PAGINATION.ITEMS_PER_PAGE"); // TODO add a header to the itemsPerPage dropdown
		});
	});

	describe("isZero", () => {
		it("should return TRUE if passed number is zero (number)", () => {
			const isZero: boolean = component.isZero(0);
			expect(isZero).toBe(true);
		});

		it("should return TRUE if passed number is zero (string)", () => {
			const isZero: boolean = component.isZero("0");
			expect(isZero).toBe(true);
		});

		it("should return FALSE if passed number is not zero (number)", () => {
			const isZero: boolean = component.isZero(1);
			expect(isZero).toBe(false);
		});

		it("should return FALSE if passed number is not zero (string)", () => {
			const isZero: boolean = component.isZero("1");
			expect(isZero).toBe(false);
		});
	});

	describe("hasNext", () => {
		beforeEach(() => {
			component.paginationConfig = {
				itemsPerPage: 4,
				totalItems: 6
			};
		});

		it("should return TRUE if there's a page after the current", () => {
			component.paginationConfig.page = 1;

			const hasNext: boolean = component.hasNext();
			expect(hasNext).toBe(true);
		});

		it("should return FALSE if there's not a page after the current", () => {
			component.paginationConfig.page = 2;

			const hasNext: boolean = component.hasNext();
			expect(hasNext).toBe(false);
		});
	});

	describe("hasPrevious", () => {
		/* tslint:disable-next-line:no-identical-functions */
		beforeEach(() => {
			component.paginationConfig = {
				itemsPerPage: 4,
				totalItems: 6
			};
		});

		it("should return TRUE if there's a page before the current", () => {
			component.paginationConfig.page = 2;

			const hasPrevious: boolean = component.hasPrevious();
			expect(hasPrevious).toBe(true);
		});

		it("should return FALSE if there's not a page before the current", () => {
			component.paginationConfig.page = 1;

			const hasPrevious: boolean = component.hasPrevious();
			expect(hasPrevious).toBe(false);
		});
	});

	describe("getTotalPages", () => {
		/* tslint:disable-next-line:no-identical-functions */
		beforeEach(() => {
			component.paginationConfig = {
				itemsPerPage: 4,
				totalItems: 6
			};
		});

		it("should return the number of pages based on number of items per page", () => {
			component.paginationConfig.itemsPerPage = 4;
			component.paginationConfig.totalItems = 10;

			const pages: number = component.getTotalPages();
			expect(pages).toBe(3);
		});

		it("should return the number of pages when itemsPerPages equals zero", () => {
			component.paginationConfig.itemsPerPage = 0;
			component.paginationConfig.totalItems = 10;

			const pages: number = component.getTotalPages();
			expect(pages).toBe(10);
		});

		it("should return NaN if there's not totalItems value", () => {
			component.paginationConfig.itemsPerPage = 4;
			component.paginationConfig.totalItems = undefined;

			const pages: number = component.getTotalPages();
			expect(pages).toBeNaN();
		});
	});

	describe("goToLast", () => {
		beforeEach(() => {
			component.paginationConfig = {
				itemsPerPage: 4,
				totalItems: 9
			};
		});

		it("should not increment the page if the current page is the last", () => {
			component.paginationConfig.page = 3;

			component.goToLast();
			expect(component.paginationConfig.page).toBe(3);
		});

		it("should go to the last page if the current page is not the last", () => {
			component.paginationConfig.page = 1;

			component.goToLast();
			expect(component.paginationConfig.page).toBe(3);
		});

		it("should call onChangePagination if the current page is not the last", () => {
			component.paginationConfig.page = 1;

			spyOn(component, "onChangePagination");
			component.goToLast();
			expect(component.onChangePagination).toHaveBeenCalledTimes(1);
		});
	});

	describe("goToNext", () => {
		/* tslint:disable-next-line:no-identical-functions */
		beforeEach(() => {
			component.paginationConfig = {
				itemsPerPage: 4,
				totalItems: 9
			};
		});

		it("should not increment the page if the current page is the last", () => {
			component.paginationConfig.page = 3;

			component.goToNext();
			expect(component.paginationConfig.page).toBe(3);
		});

		it("should increment the page if the current page is not the last", () => {
			component.paginationConfig.page = 1;

			component.goToNext();
			expect(component.paginationConfig.page).toBe(2);
		});

		it("should call onChangePagination if the current page is not the last", () => {
			component.paginationConfig.page = 1;

			spyOn(component, "onChangePagination");
			component.goToNext();
			expect(component.onChangePagination).toHaveBeenCalledTimes(1);
		});
	});

	describe("goToPrevious", () => {
		/* tslint:disable-next-line:no-identical-functions */
		beforeEach(() => {
			component.paginationConfig = {
				itemsPerPage: 4,
				totalItems: 9
			};
		});

		it("should not decrement the page if the current page is the first", () => {
			component.paginationConfig.page = 1;

			component.goToPrevious();
			expect(component.paginationConfig.page).toBe(1);
		});

		it("should decrement the page if the current page is not the first", () => {
			component.paginationConfig.page = 2;

			component.goToPrevious();
			expect(component.paginationConfig.page).toBe(1);
		});

		it("should call onChangePagination if the current page is not the first", () => {
			component.paginationConfig.page = 2;

			spyOn(component, "onChangePagination");
			component.goToPrevious();
			expect(component.onChangePagination).toHaveBeenCalledTimes(1);
		});
	});

	describe("goToFirst", () => {
		/* tslint:disable-next-line:no-identical-functions */
		beforeEach(() => {
			component.paginationConfig = {
				itemsPerPage: 4,
				totalItems: 9
			};
		});

		it("should not decrement the page if the current page is the first", () => {
			component.paginationConfig.page = 1;

			component.goToFirst();
			expect(component.paginationConfig.page).toBe(1);
		});

		it("should go to the first page if the current page is not the first", () => {
			component.paginationConfig.page = 3;

			component.goToFirst();
			expect(component.paginationConfig.page).toBe(1);
		});

		it("should call onChangePagination if the current page is not the first", () => {
			component.paginationConfig.page = 2;

			spyOn(component, "onChangePagination");
			component.goToFirst();
			expect(component.onChangePagination).toHaveBeenCalledTimes(1);
		});
	});

	describe("setPageNumbers", () => {
		beforeEach(() => {
			component.paginationConfig = {
				itemsPerPage: 4,
				itemsPerPageOptions: [4, 8, 12]
			};
		});

		it("should generate pageNumbers with 1-2-3", () => {
			component.paginationConfig.page = 2;
			component.paginationConfig.totalItems = 10;

			component.setPageNumbers();
			expect(component.pageNumbers).toEqual([1, 2, 3]);
		});

		it("should generate pageNumbers with 1-2-3-4-5", () => {
			component.paginationConfig.page = 2;
			component.paginationConfig.totalItems = 20;

			component.setPageNumbers();
			expect(component.pageNumbers).toEqual([1, 2, 3, 4, 5]);
		});

		it("should generate pageNumbers with 1-2-3-...-6", () => {
			component.paginationConfig.page = 1;
			component.paginationConfig.totalItems = 21;

			component.setPageNumbers();
			expect(component.pageNumbers).toEqual([1, 2, 3, "...", 6]);
		});

		it("should generate pageNumbers with 1-2-3-...-6 when the current page is the second", () => {
			component.paginationConfig.page = 2;
			component.paginationConfig.totalItems = 21;

			component.setPageNumbers();
			expect(component.pageNumbers).toEqual([1, 2, 3, "...", 6]);
		});

		it("should generate pageNumbers with 1-...-4-5-6 when the current page is the before last", () => {
			component.paginationConfig.page = 5;
			component.paginationConfig.totalItems = 21;

			component.setPageNumbers();
			expect(component.pageNumbers).toEqual([1, "...", 4, 5, 6]);
		});

		it("should generate pageNumbers with 1-...-5-6 when the current page is the last", () => {
			component.paginationConfig.page = 6;
			component.paginationConfig.totalItems = 21;

			component.setPageNumbers();
			expect(component.pageNumbers).toEqual([1, 2, 3, "...", 6]);
		});

		it("should generate pageNumbers with 1-...-4-5-6 when the current page is lastPage-2", () => {
			component.paginationConfig.page = 4;
			component.paginationConfig.totalItems = 21;

			component.setPageNumbers();
			expect(component.pageNumbers).toEqual([1, "...", 4, 5, 6]);
		});

		it("should generate pageNumbers with 1-...-4-...-7 when the current page is the first", () => {
			component.paginationConfig.page = 1;
			component.paginationConfig.totalItems = 28;

			component.setPageNumbers();
			expect(component.pageNumbers).toEqual([1, "...", 4, "...", 7]);
		});

		it("should generate pageNumbers with 1-...-4-...-7 when the current page is in the middle", () => {
			component.paginationConfig.page = 4;
			component.paginationConfig.totalItems = 28;

			component.setPageNumbers();
			expect(component.pageNumbers).toEqual([1, "...", 4, "...", 7]);
		});

		it("should generate pageNumbers with 1-...-5-6-7 if the current page is the before last", () => {
			component.paginationConfig.page = 6;
			component.paginationConfig.totalItems = 28;

			component.setPageNumbers();
			expect(component.pageNumbers).toEqual([1, "...", 5, 6, 7]);
		});

		it("should generate pageNumbers with 1-...-4-...-7 if the current page is the last", () => {
			component.paginationConfig.page = 7;
			component.paginationConfig.totalItems = 28;

			component.setPageNumbers();
			expect(component.pageNumbers).toEqual([1, "...", 4, "...", 7]);
		});
	});

	describe("goToPage", () => {
		beforeEach(() => {
			component.paginationConfig = {
				itemsPerPage: 4,
				page: 1,
				totalItems: 10
			};
		});

		it("should not change page when page is ...", () => {
			component.goToPage("...");
			expect(component.paginationConfig.page).toBe(1);
		});

		it("should not call onChangePagination function when page is ...", () => {
			spyOn(component, "onChangePagination");
			component.goToPage("...");
			expect(component.onChangePagination).not.toHaveBeenCalled();
		});

		it("should change page if page is 2", () => {
			component.goToPage("...");
			expect(component.paginationConfig.page).toBe(1);
		});

		it("should call onChangePagination function when page is 2", () => {
			spyOn(component, "onChangePagination");
			component.goToPage(2);
			expect(component.onChangePagination).toHaveBeenCalledTimes(1);
		});
	});

	describe("getPageInputMaxDigits", () => {
		it("should return 3 when total of pages number is composed of 3 digits", () => {
			component.paginationConfig = {
				itemsPerPage: 4,
				page: 1,
				totalItems: 680
			};

			const getPageInputMaxDigits: number = component.getPageInputMaxDigits();
			expect(getPageInputMaxDigits).toBe(3);
		});

		it("should return 1 when total of pages number is composed of 1 digit", () => {
			component.paginationConfig = {
				itemsPerPage: 4,
				page: 1,
				totalItems: 20
			};

			const getPageInputMaxDigits: number = component.getPageInputMaxDigits();
			expect(getPageInputMaxDigits).toBe(1);
		});
	});

	describe("normalizePaginationConfig", () => {
		it("should set paginationConfig.totalItems to zero if paginationConfig is not defined", () => {
			const normalizedConfig: StarkPaginationConfig = component.normalizePaginationConfig(undefined);
			expect(normalizedConfig).toEqual({ totalItems: 0 });
		});

		it("should set paginationConfig with default values if paginationConfig object is empty", () => {
			const paginationConfigDefault: StarkPaginationConfig = {
				page: 1,
				itemsPerPage: 5,
				itemsPerPageOptions: [5, 10, 15],
				isExtended: false,
				totalItems: 0,
				itemsPerPageIsPresent: true,
				pageNavIsPresent: true,
				pageInputIsPresent: true
			};

			const normalizedConfig: StarkPaginationConfig = component.normalizePaginationConfig({});
			expect(normalizedConfig).toEqual(paginationConfigDefault);
		});

		it("should NOT change paginationConfig if all properties of paginationConfig are already set", () => {
			const fullPaginationConfig: StarkPaginationConfig = {
				...paginationConfig,
				itemsPerPageIsPresent: true,
				pageNavIsPresent: true,
				pageInputIsPresent: true
			};
			const normalizedConfig: StarkPaginationConfig = component.normalizePaginationConfig(fullPaginationConfig);
			expect(normalizedConfig).toEqual(fullPaginationConfig);
		});
	});

	describe("onChangeItemsPerPage", () => {
		beforeEach(() => {
			component.paginationConfig = { ...paginationConfig };
		});

		it("should change page to 1", () => {
			component.onChangeItemsPerPage((<number[]>component.paginationConfig.itemsPerPageOptions)[1]);
			expect(component.paginationConfig.page).toBe(1);
		});

		it("should call setPageNumbers 1 time", () => {
			spyOn(component, "setPageNumbers");
			component.onChangeItemsPerPage((<number[]>component.paginationConfig.itemsPerPageOptions)[1]);
			expect(component.setPageNumbers).toHaveBeenCalledTimes(1);
		});

		it("should call onChangePagination 1 time", () => {
			spyOn(component, "onChangePagination");
			component.onChangeItemsPerPage((<number[]>component.paginationConfig.itemsPerPageOptions)[1]);
			expect(component.onChangePagination).toHaveBeenCalledTimes(1);
		});
	});

	describe("onChangePagination", () => {
		beforeEach(() => {
			component.paginationConfig = { ...paginationConfig };
		});

		it("should emit the StarkPaginateEvent 1 time", () => {
			const mockObserver: SpyObj<Observer<any>> = createSpyObj<Observer<any>>("observerSpy", ["next", "error", "complete"]);

			component.paginated.subscribe(mockObserver);
			component.onChangePagination();

			expect(mockObserver.next).toHaveBeenCalledTimes(1);
			const event: StarkPaginateEvent = mockObserver.next.calls.argsFor(0)[0];
			expect(event).toBeDefined();
			expect(event.itemsPerPage).toBe(<number>component.paginationConfig.itemsPerPage);
			expect(event.page).toBe(<number>component.paginationConfig.page);

			expect(mockObserver.error).not.toHaveBeenCalled();
			expect(mockObserver.complete).not.toHaveBeenCalled();
		});

		it("should call setPageNumbers function 1 time", () => {
			spyOn(component, "setPageNumbers");
			component.onChangePagination();
			expect(component.setPageNumbers).toHaveBeenCalledTimes(1);
		});
	});

	describe("page nav", () => {
		const selectorPageNavElement: string = ".stark-pagination ul";

		it("should be rendered if pageNavIsPresent is true or undefined", () => {
			hostComponent.paginationConfig = { ...paginationConfig, pageNavIsPresent: true };
			hostFixture.detectChanges();

			const pageNavElement: DebugElement = hostFixture.debugElement.query(By.css(selectorPageNavElement));
			expect(pageNavElement).toBeDefined();
			expect(pageNavElement).not.toBeNull();
		});

		it("should be rendered if pageNavIsPresent is undefined", () => {
			hostComponent.paginationConfig = { ...paginationConfig, pageNavIsPresent: undefined };
			hostFixture.detectChanges();

			const pageNavElement: DebugElement = hostFixture.debugElement.query(By.css(selectorPageNavElement));
			expect(pageNavElement).toBeDefined();
			expect(pageNavElement).not.toBeNull();
		});

		it("should NOT be rendered if pageNavIsPresent is false", () => {
			hostComponent.paginationConfig = { ...paginationConfig, pageNavIsPresent: false };
			hostFixture.detectChanges();

			const pageNavElement: DebugElement = hostFixture.debugElement.query(By.css(selectorPageNavElement));
			expect(pageNavElement).toBeNull();
		});
	});

	describe("page input", () => {
		const selectorPageSelector: string = ".stark-pagination div.pagination-enter-page";

		it("should be rendered if pageInputIsPresent is undefined", () => {
			hostComponent.paginationConfig = { ...paginationConfig, pageInputIsPresent: undefined };
			hostFixture.detectChanges();

			const pageSelector: DebugElement = hostFixture.debugElement.query(By.css(selectorPageSelector));

			const pageSelectorInput: DebugElement = pageSelector.query(By.css("input"));
			expect(pageSelectorInput.properties["id"]).toBe(currentPagePrefix + htmlSuffixId);
			expect(pageSelectorInput.attributes["ng-reflect-model"]).toBe("2");
			const pageSelectorTotalPages: DebugElement = pageSelector.query(By.css(totalPagesSelector));
			expect(pageSelectorTotalPages.nativeElement.innerHTML).toBe("2");
		});

		it("should be rendered if pageInputIsPresent is true", () => {
			hostComponent.paginationConfig = { ...paginationConfig, pageInputIsPresent: true };
			hostFixture.detectChanges();

			const pageSelector: DebugElement = hostFixture.debugElement.query(By.css(selectorPageSelector));

			const pageSelectorInput: DebugElement = pageSelector.query(By.css("input"));
			expect(pageSelectorInput.properties["id"]).toBe(currentPagePrefix + htmlSuffixId);
			expect(pageSelectorInput.attributes["ng-reflect-model"]).toBe("2");
			const pageSelectorTotalPages: DebugElement = pageSelector.query(By.css(totalPagesSelector));
			expect(pageSelectorTotalPages.nativeElement.innerHTML).toBe("2");
		});

		it("should NOT be rendered if pageInputIsPresent is false", () => {
			hostComponent.paginationConfig = { ...paginationConfig, pageInputIsPresent: false };
			hostFixture.detectChanges();

			const pageSelector: DebugElement = hostFixture.debugElement.query(By.css(selectorPageSelector));
			expect(pageSelector).toBeNull();
		});

		it("should trigger the pagination when a valid page is typed and the Enter key is pressed", fakeAsync(() => {
			hostComponent.paginationConfig = { ...paginationConfig, pageInputIsPresent: true };
			hostFixture.detectChanges();

			assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");

			changeInputValueAndPressEnter(hostFixture.debugElement.childNodes[0], "1");

			hostFixture.detectChanges();
			tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

			assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");
			assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
		}));

		it("should NOT trigger the pagination when an invalid page is typed and the Enter key is pressed", fakeAsync(() => {
			hostComponent.paginationConfig = { ...paginationConfig, pageInputIsPresent: true };
			hostFixture.detectChanges();

			assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");

			changeInputValueAndPressEnter(hostFixture.debugElement.childNodes[0], "4");
			hostFixture.detectChanges();
			tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

			assertPageInputSelection(hostFixture.debugElement.childNodes[0], "2"); // the input value is reverted to the last valid value
			assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
		}));
	});

	describe("itemsPerPage dropdown", () => {
		it("should be rendered if itemsPerPageIsPresent is undefined", () => {
			hostComponent.paginationConfig = { ...paginationConfig, itemsPerPageIsPresent: undefined };
			hostFixture.detectChanges();

			const itemsPerPageSelector: DebugElement = hostFixture.debugElement.query(By.directive(StarkDropdownComponent));
			expect(itemsPerPageSelector).not.toBeNull();
			expect(itemsPerPageSelector).toBeDefined();
			expect(itemsPerPageSelector.attributes["ng-reflect-dropdown-id"]).toBe(itemsPerPagePrefix + htmlSuffixId);
			/// expect(itemsPerPageSelector.attr("header")).toBe("STARK.PAGINATION.ITEMS_PER_PAGE"); // TODO add a header to the itemsPerPage dropdown
		});

		it("should be rendered if itemsPerPageIsPresent is true", () => {
			hostComponent.paginationConfig = { ...paginationConfig, itemsPerPageIsPresent: true };
			hostFixture.detectChanges();

			const itemsPerPageSelector: DebugElement = hostFixture.debugElement.query(By.directive(StarkDropdownComponent));
			expect(itemsPerPageSelector).not.toBeNull();
			expect(itemsPerPageSelector).toBeDefined();
			expect(itemsPerPageSelector.attributes["ng-reflect-dropdown-id"]).toBe(itemsPerPagePrefix + htmlSuffixId);
			/// expect(itemsPerPageSelector.attr("header")).toBe("STARK.PAGINATION.ITEMS_PER_PAGE"); // TODO add a header to the itemsPerPage dropdown
		});

		it("should NOT be rendered if pageInputIsPresent is false", () => {
			hostComponent.paginationConfig = { ...paginationConfig, itemsPerPageIsPresent: false };
			hostFixture.detectChanges();

			const itemsPerPageSelector: DebugElement = hostFixture.debugElement.query(By.directive(StarkDropdownComponent));
			expect(itemsPerPageSelector).toBeNull();
		});
	});

	describe("navigation buttons", () => {
		describe("goToFirst", () => {
			let firstButtonElement: DebugElement | null;
			const selectorFirstButtonElement: string = "li.first-page button";

			it("button should not be rendered in extended mode", () => {
				hostComponent.paginationConfig = { ...paginationConfig, page: 2, isExtended: true };
				hostFixture.detectChanges();

				firstButtonElement = hostFixture.debugElement.query(By.css(selectorFirstButtonElement));
				expect(firstButtonElement).toBeNull();
			});

			it("should change the page when the page is not already the first one", fakeAsync(() => {
				hostComponent.paginationConfig = { ...paginationConfig, page: 2, isExtended: false };
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "2");

				firstButtonElement = hostFixture.debugElement.query(By.css(selectorFirstButtonElement));
				expect(firstButtonElement.properties["disabled"]).toBeFalsy();
				firstButtonElement.triggerEventHandler("click", {});
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				firstButtonElement = hostFixture.debugElement.query(By.css(selectorFirstButtonElement));
				expect(firstButtonElement.properties["disabled"]).toBe(true);
				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");
			}));

			it("should not change the page if the page is already the first one", fakeAsync(() => {
				hostComponent.paginationConfig = { ...paginationConfig, page: 1, isExtended: false };
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");

				firstButtonElement = hostFixture.debugElement.query(By.css(selectorFirstButtonElement));
				expect(firstButtonElement.properties["disabled"]).toBe(true);
				firstButtonElement.triggerEventHandler("click", {});
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				firstButtonElement = hostFixture.debugElement.query(By.css(selectorFirstButtonElement));
				expect(firstButtonElement.properties["disabled"]).toBe(true);
				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");
			}));
		});

		describe("goToPrevious", () => {
			let previousButtonElement: DebugElement;
			const selectorPreviousButtonElement: string = "li.previous button";

			it("should change the page when the page is not already the first one", fakeAsync(() => {
				hostComponent.paginationConfig = { ...paginationConfig, page: 2 };
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "2");

				previousButtonElement = hostFixture.debugElement.query(By.css(selectorPreviousButtonElement));
				expect(previousButtonElement.properties["disabled"]).toBeFalsy();
				previousButtonElement.triggerEventHandler("click", {});
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				previousButtonElement = hostFixture.debugElement.query(By.css(selectorPreviousButtonElement));
				expect(previousButtonElement.properties["disabled"]).toBe(true);
				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");
			}));

			it("should not change the page if the page is already the first one", fakeAsync(() => {
				hostComponent.paginationConfig = { ...paginationConfig, page: 1 };
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");

				previousButtonElement = hostFixture.debugElement.query(By.css(selectorPreviousButtonElement));
				expect(previousButtonElement.properties["disabled"]).toBe(true);
				previousButtonElement.triggerEventHandler("click", {});
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				previousButtonElement = hostFixture.debugElement.query(By.css(selectorPreviousButtonElement));
				expect(previousButtonElement.properties["disabled"]).toBe(true);
				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");
			}));
		});

		describe("goToNext", () => {
			let nextButtonElement: DebugElement;
			const selectorNextButtonElement: string = "li.next button";

			it("should change the page if the page is not already the last one", fakeAsync(() => {
				hostComponent.paginationConfig = { ...paginationConfig, page: 1 };
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");

				nextButtonElement = hostFixture.debugElement.query(By.css(selectorNextButtonElement));
				expect(nextButtonElement.properties["disabled"]).toBeFalsy();
				nextButtonElement.triggerEventHandler("click", {});
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				nextButtonElement = hostFixture.debugElement.query(By.css(selectorNextButtonElement));
				expect(nextButtonElement.properties["disabled"]).toBe(true);
				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "2");
			}));

			it("should not change the page if the page is already the last one", fakeAsync(() => {
				hostComponent.paginationConfig = { ...paginationConfig, page: 2 };
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "2");

				nextButtonElement = hostFixture.debugElement.query(By.css(selectorNextButtonElement));
				expect(nextButtonElement.properties["disabled"]).toBe(true);
				nextButtonElement.triggerEventHandler("click", {});
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				nextButtonElement = hostFixture.debugElement.query(By.css(selectorNextButtonElement));
				expect(nextButtonElement.properties["disabled"]).toBe(true);
				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "2");
			}));
		});

		describe("goToLast", () => {
			let lastButtonElement: DebugElement | null;
			const selectorLastButtonElement: string = "li.last-page button";

			it("button should not be rendered in extended mode", () => {
				hostComponent.paginationConfig = { ...paginationConfig, page: 2, isExtended: true };
				hostFixture.detectChanges();

				lastButtonElement = hostFixture.debugElement.query(By.css("li.first-page button"));
				expect(lastButtonElement).toBeNull();
			});

			it("should change the page if the page is not already the last one", fakeAsync(() => {
				hostComponent.paginationConfig = { ...paginationConfig, page: 1, isExtended: false };
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");

				lastButtonElement = hostFixture.debugElement.query(By.css(selectorLastButtonElement));
				expect(lastButtonElement.properties["disabled"]).toBeFalsy();
				lastButtonElement.triggerEventHandler("click", {});
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				lastButtonElement = hostFixture.debugElement.query(By.css(selectorLastButtonElement));
				expect(lastButtonElement.properties["disabled"]).toBe(true);
				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "2");
			}));

			it("should not change the page if the page is already the last one", fakeAsync(() => {
				hostComponent.paginationConfig = { ...paginationConfig, page: 2, isExtended: false };
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "2");

				lastButtonElement = hostFixture.debugElement.query(By.css(selectorLastButtonElement));
				expect(lastButtonElement.properties["disabled"]).toBe(true);
				lastButtonElement.triggerEventHandler("click", {});
				hostFixture.detectChanges();
				tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

				lastButtonElement = hostFixture.debugElement.query(By.css(selectorLastButtonElement));
				expect(lastButtonElement.properties["disabled"]).toBe(true);
				assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
				assertPageInputSelection(hostFixture.debugElement.childNodes[0], "2");
			}));
		});
	});

	describe("pageNumbers", () => {
		it("should change page if click on page number", fakeAsync(() => {
			hostComponent.paginationConfig = { ...paginationConfig, page: 2, totalItems: 10 };
			hostFixture.detectChanges();
			tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

			assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
			assertPageInputSelection(hostFixture.debugElement.childNodes[0], "2");

			const pageTwoElement: DebugElement = hostFixture.debugElement.query(By.css("li[value='3'] a"));
			pageTwoElement.triggerEventHandler("click", {});
			hostFixture.detectChanges();
			tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

			assertPageNavSelection(hostFixture.debugElement.childNodes[0], "3");
			assertPageInputSelection(hostFixture.debugElement.childNodes[0], "3");
		}));

		it("should not change page if click on '...'", fakeAsync(() => {
			hostComponent.paginationConfig = { ...paginationConfig, page: 1, totalItems: 50 };
			hostFixture.detectChanges();
			tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

			assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
			assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");

			// Angular sets the 'value' attribute of <li> elements to "0" instead of "..."
			const morePagesElement: DebugElement = hostFixture.debugElement.query(By.css("li[value='0']"));
			morePagesElement.triggerEventHandler("click", {});
			hostFixture.detectChanges();
			tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

			assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
			assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");
		}));
	});

	describe("on paginationConfig change", () => {
		beforeEach(fakeAsync(() => {
			hostComponent.paginationConfig = { ...paginationConfig, totalItems: 10 };
			hostFixture.detectChanges();
			tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)
		}));

		it("should change pageNumbers if totalItems has changed", () => {
			const previousPageNumbersLength: number = hostFixture.debugElement.queryAll(By.css(pageNumbersSelector)).length;
			hostComponent.paginationConfig = { ...paginationConfig, totalItems: 13 };
			hostFixture.detectChanges();
			const currentPageNumbersElement: number = hostFixture.debugElement.queryAll(By.css(pageNumbersSelector)).length;
			expect(currentPageNumbersElement).not.toEqual(previousPageNumbersLength);
		});

		it("should not change pageNumbers if totalItems has not changed", () => {
			const previousPageNumbersLength: number = hostFixture.debugElement.queryAll(By.css(pageNumbersSelector)).length;
			hostComponent.paginationConfig = { ...paginationConfig, totalItems: 10 };
			hostFixture.detectChanges();
			const currentPageNumbersElement: number = hostFixture.debugElement.queryAll(By.css(pageNumbersSelector)).length;
			expect(currentPageNumbersElement).toEqual(previousPageNumbersLength);
		});

		it("should set current page to 1 when it is undefined in config", fakeAsync(() => {
			assertPageNavSelection(hostFixture.debugElement.childNodes[0], "2");
			assertPageInputSelection(hostFixture.debugElement.childNodes[0], "2");

			hostComponent.paginationConfig = { ...paginationConfig, page: undefined };
			hostFixture.detectChanges();
			tick(); // since values are set on ngModel asynchronously (see https://github.com/angular/angular/issues/22606)

			assertPageNavSelection(hostFixture.debugElement.childNodes[0], "1");
			assertPageInputSelection(hostFixture.debugElement.childNodes[0], "1");
		}));
	});
});
