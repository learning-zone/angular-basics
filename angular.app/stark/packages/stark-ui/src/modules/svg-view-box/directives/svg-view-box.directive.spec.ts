/*tslint:disable:completed-docs*/
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { STARK_LOGGING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { StarkSvgViewBoxDirective } from "./svg-view-box.directive";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("SvgViewBoxDirective", () => {
	@Component({
		selector: "test-component",
		template: getTemplate("starkSvgViewBox")
	})
	class TestComponent {}

	let fixture: ComponentFixture<TestComponent>;

	function getTemplate(svgViewBoxDirective: string, viewBoxAttribute?: string): string {
		return (
			"<div " +
			svgViewBoxDirective +
			"><svg xmlns='http://www.w3.org/2000/svg' " +
			viewBoxAttribute +
			">" +
			"<text font-size='8' font-family='serif' y='6'><![CDATA[dummy icon]]></text>" +
			"</svg></div>"
		);
	}

	function initializeComponentFixture(): void {
		fixture = TestBed.createComponent(TestComponent);
		// trigger initial data binding
		fixture.detectChanges();
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StarkSvgViewBoxDirective, TestComponent],
			providers: [{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() }]
		});
	});

	describe("when viewBox value is not defined", () => {
		beforeEach(fakeAsync(() => {
			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should add the default values to the viewBox attribute of the svg element", () => {
			expect(fixture).toBeDefined();
			const parentElement: DebugElement = fixture.debugElement.query(By.directive(StarkSvgViewBoxDirective));
			expect(parentElement).toBeDefined();
			const svgElement: SVGElement = parentElement.nativeElement.querySelector("svg");
			expect(svgElement).toBeDefined();
			expect(svgElement.hasAttribute("viewBox")).toBe(true);
			expect(svgElement.getAttribute("viewBox")).toBe("0 0 24 24");
		});
	});

	describe("when viewBox value is given", () => {
		const viewBoxValue: number = 48;

		// overriding the components's template
		beforeEach(fakeAsync(() => {
			const newTemplate: string = getTemplate("starkSvgViewBox='" + viewBoxValue + "'");

			TestBed.overrideTemplate(TestComponent, newTemplate);

			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should add the provided value as the width and height of the viewBox attribute of the svg element", () => {
			expect(fixture).toBeDefined();
			const parentElement: DebugElement = fixture.debugElement.query(By.directive(StarkSvgViewBoxDirective));
			expect(parentElement).toBeDefined();
			const svgElement: SVGElement = parentElement.nativeElement.querySelector("svg");
			expect(svgElement).toBeDefined();
			expect(svgElement.hasAttribute("viewBox")).toBe(true);
			expect(svgElement.getAttribute("viewBox")).toBe(`0 0 ${viewBoxValue} ${viewBoxValue}`);
		});
	});

	describe("when SVG has already the viewBox attribute", () => {
		const viewBoxAttribute: string = "0 0 12 12";

		// overriding the components's template
		beforeEach(fakeAsync(() => {
			const newTemplate: string = getTemplate("starkSvgViewBox", "viewBox='" + viewBoxAttribute + "'");

			TestBed.overrideTemplate(TestComponent, newTemplate);

			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should keep the viewBox attribute as is", () => {
			expect(fixture).toBeDefined();
			const parentElement: DebugElement = fixture.debugElement.query(By.directive(StarkSvgViewBoxDirective));
			expect(parentElement).toBeDefined();
			const svgElement: SVGElement = parentElement.nativeElement.querySelector("svg");
			expect(svgElement).toBeDefined();
			expect(svgElement.hasAttribute("viewBox")).toBe(true);
			expect(svgElement.getAttribute("viewBox")).toBe(viewBoxAttribute);
		});
	});
});
