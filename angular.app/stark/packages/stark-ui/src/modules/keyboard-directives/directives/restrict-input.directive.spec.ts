/*tslint:disable:completed-docs*/
import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { STARK_LOGGING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { StarkRestrictInputDirective } from "./restrict-input.directive";
import Spy = jasmine.Spy;
import createSpy = jasmine.createSpy;

describe("RestrictInputDirective", () => {
	@Component({
		selector: "test-component",
		template: getTemplate("starkRestrictInput")
	})
	class TestComponent {
		public onEnterKeyHandler: Spy = createSpy("onEnterKeyHandlerSpy");
	}

	let fixture: ComponentFixture<TestComponent>;

	function getTemplate(restrictInputDirective: string): string {
		return "<input " + "type='text' " + restrictInputDirective + ">";
	}

	function initializeComponentFixture(): void {
		fixture = TestBed.createComponent(TestComponent);
		// trigger initial data binding
		fixture.detectChanges();
	}

	function triggerKeyPressEvent(inputElement: DebugElement, value: string): KeyboardEvent {
		(<HTMLInputElement>inputElement.nativeElement).value = value;

		const keypressEvent: Event = document.createEvent("Event");
		keypressEvent.initEvent("keypress", true, true);
		keypressEvent["char"] = value;
		keypressEvent["key"] = value;
		inputElement.triggerEventHandler("keypress", keypressEvent);

		return <KeyboardEvent>keypressEvent;
	}

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [StarkRestrictInputDirective, TestComponent],
			providers: [{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() }]
		});
	});

	describe("when input restriction is not defined", () => {
		beforeEach(fakeAsync(() => {
			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should NOT prevent any value from being typed in the input when no input restriction was provided", () => {
			expect(fixture).toBeDefined();
			const inputElement: DebugElement = fixture.debugElement.query(By.css("input"));

			let keyPressEvent: Event = triggerKeyPressEvent(inputElement, "1");
			expect(keyPressEvent.defaultPrevented).toBe(false);

			keyPressEvent = triggerKeyPressEvent(inputElement, "9");
			expect(keyPressEvent.defaultPrevented).toBe(false);

			keyPressEvent = triggerKeyPressEvent(inputElement, "0");
			expect(keyPressEvent.defaultPrevented).toBe(false);
		});
	});

	describe("when input restriction is given", () => {
		// overriding the components's template
		beforeEach(fakeAsync(() => {
			// the directive should not be used with square brackets "[]" because the input is an string literal!
			const newTemplate: string = getTemplate("starkRestrictInput='\\d'");

			TestBed.overrideTemplate(TestComponent, newTemplate);

			// compile template and css
			return TestBed.compileComponents();
		}));

		beforeEach(() => {
			initializeComponentFixture();
		});

		it("should prevent any value other than the given ones in the configuration from being typed in the input", () => {
			const inputElement: DebugElement = fixture.debugElement.query(By.css("input"));

			let keyPressEvent: KeyboardEvent = triggerKeyPressEvent(inputElement, "a");
			expect(keyPressEvent.defaultPrevented).toBe(true);

			keyPressEvent = triggerKeyPressEvent(inputElement, "B");
			expect(keyPressEvent.defaultPrevented).toBe(true);

			keyPressEvent = triggerKeyPressEvent(inputElement, "-");
			expect(keyPressEvent.defaultPrevented).toBe(true);
		});

		it("should NOT prevent any of the values given in the configuration from being typed in the input", () => {
			const inputElement: DebugElement = fixture.debugElement.query(By.css("input"));

			let keyPressEvent: Event = triggerKeyPressEvent(inputElement, "1");
			expect(keyPressEvent.defaultPrevented).toBe(false);

			keyPressEvent = triggerKeyPressEvent(inputElement, "9");
			expect(keyPressEvent.defaultPrevented).toBe(false);

			keyPressEvent = triggerKeyPressEvent(inputElement, "0");
			expect(keyPressEvent.defaultPrevented).toBe(false);
		});
	});
});
