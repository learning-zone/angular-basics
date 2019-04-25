/*tslint:disable:completed-docs*/
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { STARK_LOGGING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { StarkOnEnterKeyDirective } from "./on-enter-key.directive";
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

describe("OnEnterKeyDirective", () => {
	@Component({
		selector: "test-component",
		template: getTemplate("starkOnEnterKey")
	})
	class TestComponent {
		public onEnterKeyHandler: Spy = createSpy("onEnterKeyHandlerSpy");

		public onEnterKeyParam: object = { id: "123" };
	}

	let fixture: ComponentFixture<TestComponent>;

	function getTemplate(onEnterKeyDirective: string): string {
		return "<input " + "type='text' " + onEnterKeyDirective + ">";
	}

	function initializeComponentFixture(): void {
		fixture = TestBed.createComponent(TestComponent);
		// trigger initial data binding
		fixture.detectChanges();
	}

	function triggerKeyPressEvent(inputElement: DebugElement, key: string): void {
		const keypressEvent: Event = document.createEvent("Event");
		keypressEvent.initEvent("keypress", true, true);
		keypressEvent["key"] = key;
		inputElement.triggerEventHandler("keypress", keypressEvent);
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StarkOnEnterKeyDirective, TestComponent],
			providers: [{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() }]
		});
	});

	describe("when onEnterKeyHandler is not defined", () => {
		beforeEach(fakeAsync(() => {
			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should not do anything when the enter key is pressed and the enter key handler was not provided", () => {
			expect(fixture).toBeDefined();
			const hostComponent: TestComponent = fixture.componentInstance;

			const inputElement: DebugElement = fixture.debugElement.query(By.css("input"));
			triggerKeyPressEvent(inputElement, "Enter");

			expect(hostComponent.onEnterKeyHandler).not.toHaveBeenCalled();
		});
	});

	describe("when onEnterKeyHandler is given", () => {
		// overriding the components's template
		beforeEach(fakeAsync(() => {
			const newTemplate: string = getTemplate("[starkOnEnterKey]='onEnterKeyHandler' [starkOnEnterKeyParams]='[onEnterKeyParam]'");

			TestBed.overrideTemplate(TestComponent, newTemplate);

			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should call the given function when Enter key is pressed", () => {
			const hostComponent: TestComponent = fixture.componentInstance;

			const inputElement: DebugElement = fixture.debugElement.query(By.css("input"));
			triggerKeyPressEvent(inputElement, "Enter");

			expect(hostComponent.onEnterKeyHandler).toHaveBeenCalledTimes(1);
			expect(hostComponent.onEnterKeyHandler).toHaveBeenCalledWith(hostComponent.onEnterKeyParam);
		});

		it("should not call the given function when a key other than Enter is pressed", () => {
			const hostComponent: TestComponent = fixture.componentInstance;

			const inputElement: DebugElement = fixture.debugElement.query(By.css("input"));
			triggerKeyPressEvent(inputElement, "a");

			expect(hostComponent.onEnterKeyHandler).not.toHaveBeenCalled();
		});
	});
});
