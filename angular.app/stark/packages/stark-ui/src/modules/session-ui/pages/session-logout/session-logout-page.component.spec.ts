/* tslint:disable:completed-docs */
/* angular imports */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
/* stark-core imports */
import { STARK_APP_CONFIG, STARK_LOGGING_SERVICE, StarkApplicationConfig } from "@nationalbankbelgium/stark-core";

import { TranslateModule } from "@ngx-translate/core";

import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
/* stark-ui imports */
import { StarkSessionLogoutPageComponent } from "./session-logout-page.component";

describe("StarkSessionLogoutPageComponent", () => {
	let component: StarkSessionLogoutPageComponent;
	let fixture: ComponentFixture<StarkSessionLogoutPageComponent>;

	const mockStarkAppConfig: Partial<StarkApplicationConfig> = {
		baseUrl: "base-url"
	};

	beforeEach(async(() => {
		const mockLogger: MockStarkLoggingService = new MockStarkLoggingService();
		return TestBed.configureTestingModule({
			declarations: [StarkSessionLogoutPageComponent],
			imports: [CommonModule, TranslateModule.forRoot()],
			providers: [
				{ provide: STARK_LOGGING_SERVICE, useValue: mockLogger },
				{ provide: STARK_APP_CONFIG, useValue: mockStarkAppConfig }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StarkSessionLogoutPageComponent);
		component = fixture.componentInstance;
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(fixture).toBeDefined();
			expect(component).toBeDefined();
			expect(component.appConfig).not.toBeNull();
			expect(component.appConfig).toBeDefined();
			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();
		});
	});

	describe("logon", () => {
		it("should open url", () => {
			spyOn(window, "open");
			component.logon();
			expect(window.open).toHaveBeenCalledTimes(1);
			expect(window.open).toHaveBeenCalledWith("base-url", "_self");
		});
	});
});
