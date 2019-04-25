/*tslint:disable:completed-docs*/
import { Component, NO_ERRORS_SCHEMA, ViewChild } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarRef } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";
import { STARK_LOGGING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { StarkMessageType } from "../../../common/message";
import { StarkToastNotificationComponent } from "./toast-notification.component";
import { StarkSvgViewBoxModule } from "../../svg-view-box";

@Component({
	selector: `host-component`,
	template: `<stark-toast-notification></stark-toast-notification>`
})
class TestHostComponent {
	@ViewChild(StarkToastNotificationComponent)
	public toastNotificationComponent: StarkToastNotificationComponent;
}

describe("ToastNotificationComponent", () => {
	let component: StarkToastNotificationComponent;
	let hostComponent: TestHostComponent;
	let fixture: ComponentFixture<TestHostComponent>;

	const mockMatSnackBarConfig: any = {
		delay: 10,
		actionLabel: "action",
		actionClasses: []
	};

	const mockSnackBarRef: Partial<MatSnackBarRef<any>> = {
		dismissWithAction: jasmine.createSpy("dismissWithAction")
	};

	const mockSnackBar: Partial<MatSnackBar> = {
		_openedSnackBarRef: <MatSnackBarRef<any>>mockSnackBarRef
	};
	/**
	 * async beforeEach
	 */
	beforeEach(async(() => {
		return (
			TestBed.configureTestingModule({
				declarations: [StarkToastNotificationComponent, TestHostComponent],
				imports: [TranslateModule.forRoot(), MatButtonModule, StarkSvgViewBoxModule, MatIconModule],
				providers: [
					{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() },
					{ provide: MatSnackBar, useValue: mockSnackBar },
					{ provide: MAT_SNACK_BAR_DATA, useValue: mockMatSnackBarConfig }
				],
				schemas: [NO_ERRORS_SCHEMA] // to avoid errors due to "mat-icon" directive not known (which we don't want to add in these tests)
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
		fixture = TestBed.createComponent(TestHostComponent);
		hostComponent = fixture.componentInstance;
		fixture.detectChanges(); // trigger initial data binding

		component = hostComponent.toastNotificationComponent;
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(fixture).toBeDefined();
			expect(component).toBeDefined();

			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();

			expect(component.snackBar).not.toBeNull();
			expect(component.snackBar).toBeDefined();

			expect(component.data).not.toBeNull();
			expect(component.data).toBeDefined();
			expect(component.data.delay).toBeDefined();
			expect(component.data.delay).toBe(10);
			expect(component.data.actionLabel).toBeDefined();
			expect(component.data.actionLabel).toBe("action");
			expect(component.data.actionClasses).toBeDefined();
			expect(component.data.type).toBeUndefined();
		});
	});

	describe("on closeToast() call", () => {
		it("should call hide service method", () => {
			component.closeToast();
			if (mockSnackBar._openedSnackBarRef) {
				expect(mockSnackBar._openedSnackBarRef.dismissWithAction).toHaveBeenCalled();
			}
		});
	});

	describe("on getMessageTypeClass() call", () => {
		it("should return the correct class name", () => {
			let cssClass: string = component.getMessageTypeClass();
			expect(cssClass).toBe("");

			component.data.type = StarkMessageType.WARNING;
			cssClass = component.getMessageTypeClass();
			expect(cssClass).toBe("stark-toast-message-warning");

			component.data.type = StarkMessageType.INFO;
			cssClass = component.getMessageTypeClass();
			expect(cssClass).toBe("stark-toast-message-info");

			component.data.type = StarkMessageType.ERROR;
			cssClass = component.getMessageTypeClass();
			expect(cssClass).toBe("stark-toast-message-error");
		});
	});
});
