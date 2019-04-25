import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule, MatMenuModule, MatTooltipModule } from "@angular/material";
import { STARK_LOGGING_SERVICE, STARK_ROUTING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService, MockStarkRoutingService } from "@nationalbankbelgium/stark-core/testing";
import { StarkSvgViewBoxModule } from "../../svg-view-box/svg-view-box.module";
import { StarkActionBarComponent } from "./action-bar.component";
import { StarkActionBarConfig } from "./action-bar-config.intf";
import { StarkAction } from "./action.intf";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import createSpy = jasmine.createSpy;

describe("ActionBarComponent", () => {
	let fixture: ComponentFixture<StarkActionBarComponent>;
	let component: StarkActionBarComponent;
	const buttonToggleSelector: string = ".extend-action-bar";

	beforeEach(async(() => {
		return TestBed.configureTestingModule({
			declarations: [StarkActionBarComponent],
			imports: [StarkSvgViewBoxModule, MatButtonModule, MatMenuModule, MatTooltipModule, TranslateModule.forRoot()],
			providers: [
				{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() },
				{ provide: STARK_ROUTING_SERVICE, useClass: MockStarkRoutingService },
				TranslateService
			],
			schemas: [NO_ERRORS_SCHEMA] // tells the Angular compiler to ignore unrecognized elements and attributes (svgIcon)
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StarkActionBarComponent);
		component = fixture.componentInstance;
		const demoActions: StarkAction[] = [
			{
				id: "userDetailValidate",
				label: "Validate",
				icon: "check",
				actionCall: createSpy("actionCallSpy"),
				isEnabled: false,
				isVisible: true
			},
			{
				id: "userDetailSave",
				label: "Save",
				icon: "content-save",
				actionCall: createSpy("actionCallSpy"),
				isEnabled: true,
				isVisible: true
			}
		];

		const demoActionBarConfig: StarkActionBarConfig = {
			actions: demoActions,
			isPresent: true
		};

		component.actionBarConfig = demoActionBarConfig;
		fixture.detectChanges();
	});

	describe("@Input() mode", () => {
		it("should have the toggle action bar button visible in full mode", () => {
			component.mode = "full";
			fixture.detectChanges();
			const buttonToggleExtend: HTMLElement = fixture.nativeElement.querySelector(buttonToggleSelector);
			expect(buttonToggleExtend).toBeDefined();
		});

		it("should not have the toggle action bar button visible in compact mode", () => {
			component.mode = "compact";
			fixture.detectChanges();
			const buttonToggleExtend: HTMLElement = fixture.nativeElement.querySelector(buttonToggleSelector);
			expect(buttonToggleExtend).toBeNull();
		});
	});

	describe("@Input() actionBarId", () => {
		it("should have set the id of the action bar", () => {
			component.actionBarId = "action-bar-id";
			fixture.detectChanges();
			const actionBar: HTMLElement = fixture.nativeElement.querySelector("#" + component.actionBarId);
			expect(actionBar).toBeDefined();
		});
	});

	describe("@Input() actionBarConfig", () => {
		it("should not call the defined action when disabled", () => {
			const menuItem: HTMLElement = fixture.nativeElement.querySelector(
				"#" + component.actionBarId + "-" + component.actionBarConfig.actions[0].id
			);
			menuItem.click();
			expect(component.actionBarConfig.actions[0].actionCall).not.toHaveBeenCalled();
		});

		it("should call the defined action when enabled", () => {
			const menuItem: HTMLElement = fixture.nativeElement.querySelector(
				"#" + component.actionBarId + "-" + component.actionBarConfig.actions[1].id
			);
			menuItem.click();
			expect(component.actionBarConfig.actions[1].actionCall).toHaveBeenCalledTimes(1);
		});
	});

	describe("@Input() alternativeActions", () => {
		beforeEach(() => {
			component.alternativeActions = component.actionBarConfig.actions;
			fixture.detectChanges();
		});

		it("should display", () => {
			const actionBar: HTMLElement = fixture.nativeElement.querySelector(".open-alt-actions");
			expect(actionBar).toBeDefined();
		});
	});

	describe("toggle extended action bar", () => {
		it("should toggle the action bar extension", () => {
			const buttonToggleExtend: HTMLElement = fixture.nativeElement.querySelector(buttonToggleSelector);
			spyOn(component, "toggleExtendedActionBar").and.callThrough();
			buttonToggleExtend.click();
			fixture.detectChanges();
			expect(component.toggleExtendedActionBar).toHaveBeenCalledTimes(1);
			expect(component.isExtended).toBe(true);
			buttonToggleExtend.click();
			fixture.detectChanges();
			expect(component.toggleExtendedActionBar).toHaveBeenCalledTimes(2);
			expect(component.isExtended).toBe(false);
		});
	});
});
