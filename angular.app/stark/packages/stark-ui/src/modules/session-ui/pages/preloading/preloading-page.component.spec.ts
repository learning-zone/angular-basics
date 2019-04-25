/* tslint:disable:completed-docs */
/* angular imports */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
/* stark-core imports */
import { STARK_LOGGING_SERVICE, STARK_ROUTING_SERVICE, STARK_USER_SERVICE } from "@nationalbankbelgium/stark-core";

import { TranslateModule } from "@ngx-translate/core";

import { MockStarkLoggingService, MockStarkRoutingService, MockStarkUserService } from "@nationalbankbelgium/stark-core/testing";
/* stark-ui imports */
import { StarkPreloadingPageComponent } from "./preloading-page.component";
import { MatButtonModule } from "@angular/material/button";

describe("StarkPreloadingPageComponent", () => {
	let component: StarkPreloadingPageComponent;
	let fixture: ComponentFixture<StarkPreloadingPageComponent>;

	beforeEach(async(() => {
		const mockLogger: MockStarkLoggingService = new MockStarkLoggingService();
		return TestBed.configureTestingModule({
			declarations: [StarkPreloadingPageComponent],
			imports: [CommonModule, MatButtonModule, TranslateModule.forRoot()],
			providers: [
				{ provide: STARK_LOGGING_SERVICE, useValue: mockLogger },
				{ provide: STARK_ROUTING_SERVICE, useClass: MockStarkRoutingService },
				{ provide: STARK_USER_SERVICE, useClass: MockStarkUserService }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StarkPreloadingPageComponent);
		component = fixture.componentInstance;
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(fixture).toBeDefined();
			expect(component).toBeDefined();
			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();
			expect(component.routingService).not.toBeNull();
			expect(component.routingService).toBeDefined();
			expect(component.userService).not.toBeNull();
			expect(component.userService).toBeDefined();
		});
	});

	describe("reload", () => {
		it("should call reload method of routingService", () => {
			component.reload();
			expect(component.routingService.reload).toHaveBeenCalledTimes(1);
		});
	});
});
