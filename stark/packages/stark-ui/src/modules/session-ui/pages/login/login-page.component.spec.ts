/* tslint:disable:completed-docs */
/* angular imports */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
/* stark-core imports */
import {
	STARK_LOGGING_SERVICE,
	STARK_ROUTING_SERVICE,
	STARK_SESSION_SERVICE,
	STARK_USER_SERVICE,
	StarkUser
} from "@nationalbankbelgium/stark-core";

import { TranslateModule } from "@ngx-translate/core";
import { RawParams } from "@uirouter/core";

import {
	MockStarkLoggingService,
	MockStarkRoutingService,
	MockStarkSessionService,
	MockStarkUserService
} from "@nationalbankbelgium/stark-core/testing";
/* stark-ui imports */
import { StarkLoginPageComponent } from "./login-page.component";

describe("StarkLoginPageComponent", () => {
	let component: StarkLoginPageComponent;
	let fixture: ComponentFixture<StarkLoginPageComponent>;

	const mockUser: StarkUser = {
		firstName: "John",
		lastName: "Doe",
		username: "jdoe",
		uuid: "mock-uuid",
		roles: []
	};

	const mockUserWithRoles: StarkUser = {
		firstName: "John",
		lastName: "Doe",
		username: "jdoe",
		uuid: "mock-uuid",
		roles: ["admin", "developer"]
	};

	beforeEach(async(() => {
		const mockLogger: MockStarkLoggingService = new MockStarkLoggingService();
		return TestBed.configureTestingModule({
			declarations: [StarkLoginPageComponent],
			imports: [CommonModule, TranslateModule.forRoot()],
			providers: [
				{ provide: STARK_LOGGING_SERVICE, useValue: mockLogger },
				{ provide: STARK_ROUTING_SERVICE, useClass: MockStarkRoutingService },
				{ provide: STARK_USER_SERVICE, useClass: MockStarkUserService },
				{ provide: STARK_SESSION_SERVICE, useValue: new MockStarkSessionService() }
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StarkLoginPageComponent);
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
			expect(component.sessionService).not.toBeNull();
			expect(component.sessionService).toBeDefined();
			expect(component.userService).not.toBeNull();
			expect(component.userService).toBeDefined();
		});
	});

	describe("userProfilesAvailable", () => {
		it("should return FALSE if users is undefined", () => {
			component.users = <any>undefined;
			expect(component.userProfilesAvailable()).toBe(false);
		});

		it("should return FALSE if users array is empty", () => {
			component.users = <any>[];
			expect(component.userProfilesAvailable()).toBe(false);
		});

		it("should return TRUE if users array is NOT empty", () => {
			component.users = [mockUser];
			expect(component.userProfilesAvailable()).toBe(true);
		});
	});

	describe("getUserRoles", () => {
		it("should return empty string if passed user has no defined roles", () => {
			expect(component.getUserRoles(mockUser)).toBe("");
		});

		it("should return string with defined roles of the passed user", () => {
			expect(component.getUserRoles(mockUserWithRoles)).toBe("admin,developer");
		});
	});

	describe("authenticateUser", () => {
		it("should navigateTo to the provided targetState and login the user through the session service", () => {
			const mockState: string = "mock-state";
			const mockStateParams: RawParams = {
				param: "mock-state-param"
			};
			component.targetState = mockState;
			component.targetStateParams = mockStateParams;
			fixture.detectChanges();
			component.authenticateUser(mockUser);
			expect(component.routingService.navigateTo).toHaveBeenCalledTimes(1);
			expect(component.routingService.navigateTo).toHaveBeenCalledWith(mockState, mockStateParams);
			expect(component.routingService.navigateToHome).not.toHaveBeenCalled();
			expect(component.sessionService.login).toHaveBeenCalledTimes(1);
			expect(component.sessionService.login).toHaveBeenCalledWith(mockUser);
			expect(component.logger.error).not.toHaveBeenCalled();
		});

		it("should navigateToHome and login the user through the session service", () => {
			component.authenticateUser(mockUser);
			expect(component.routingService.navigateTo).not.toHaveBeenCalled();
			expect(component.routingService.navigateToHome).toHaveBeenCalledTimes(1);
			expect(component.sessionService.login).toHaveBeenCalledTimes(1);
			expect(component.sessionService.login).toHaveBeenCalledWith(mockUser);
			expect(component.logger.error).not.toHaveBeenCalled();
		});
	});
});
