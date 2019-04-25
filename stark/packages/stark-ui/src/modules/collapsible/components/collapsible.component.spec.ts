/*tslint:disable:completed-docs*/
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { STARK_LOGGING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { StarkCollapsibleComponent } from "./collapsible.component";

describe("CollapsibleComponent", () => {
	let component: StarkCollapsibleComponent;
	let fixture: ComponentFixture<StarkCollapsibleComponent>;

	/**
	 * async beforeEach
	 */
	beforeEach(async(() => {
		return (
			TestBed.configureTestingModule({
				imports: [],
				declarations: [StarkCollapsibleComponent],
				providers: [{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() }],
				schemas: [NO_ERRORS_SCHEMA] // tells the Angular compiler to ignore unrecognized elements and attributes (svgIcon)
			})
				/**
				 * Compile template and css
				 */
				.compileComponents()
		);
	}));

	/**
	 * Synchronous beforeEach
	 */
	beforeEach(() => {
		fixture = TestBed.createComponent(StarkCollapsibleComponent);
		component = fixture.componentInstance;

		// inputs
		component.htmlId = "toto";
		component.titleLabel = "titre";
		component.iconSpinningEnabled = true;

		fixture.detectChanges(); // trigger initial data binding
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(fixture).toBeDefined();
			expect(component).toBeDefined();

			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();

			expect(component.htmlId).not.toBeNull();
			expect(component.htmlId).toBeDefined();
			expect(component.htmlId).toBe("toto");

			expect(component.isExpanded).not.toBeNull();
			expect(component.isExpanded).toBeDefined();
			expect(component.isExpanded).toBe(false);

			expect(component.titleLabel).not.toBeNull();
			expect(component.titleLabel).toBeDefined();
			expect(component.titleLabel).toBe("titre");

			expect(component.iconSpinningEnabled).not.toBeNull();
			expect(component.iconSpinningEnabled).toBeDefined();
			expect(component.iconSpinningEnabled).toBe(true);
		});
	});

	describe("@Input()", () => {
		it("should have modified the view accordingly", () => {
			const actionBar: HTMLElement = fixture.nativeElement.querySelector("#" + component.htmlId);
			expect(actionBar).toBeDefined();

			const matIcon: HTMLElement = fixture.nativeElement.querySelector("mat-icon");
			expect(matIcon.className).toContain("spin");
		});
	});

	describe("toggleCollapsible()", () => {
		it("should change the isExpanded value and send it as output", () => {
			const exp: boolean = component.isExpanded;

			// Test output
			component.isExpandedChange.subscribe((value: boolean) => {
				expect(value).toBe(!exp);
			});

			component.toggleCollapsible();

			expect(component.isExpanded).toBe(!exp);
		});
	});
});
