/*tslint:disable:completed-docs*/
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { STARK_LOGGING_SERVICE, STARK_ROUTING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService, MockStarkRoutingService } from "@nationalbankbelgium/stark-core/testing";
import { StarkAppLogoComponent } from "./app-logo.component";
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe("AppLogoComponent", () => {
	let component: StarkAppLogoComponent;
	let fixture: ComponentFixture<StarkAppLogoComponent>;

	/**
	 * async beforeEach
	 */
	beforeEach(async(() => {
		return (
			TestBed.configureTestingModule({
				declarations: [StarkAppLogoComponent],
				providers: [
					{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() },
					{ provide: STARK_ROUTING_SERVICE, useClass: MockStarkRoutingService }
				]
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
		fixture = TestBed.createComponent(StarkAppLogoComponent);
		component = fixture.componentInstance;

		fixture.detectChanges(); // trigger initial data binding
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(fixture).toBeDefined();
			expect(component).toBeDefined();

			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();
			expect(component.routingService).not.toBeNull();
			expect(component.routingService).toBeDefined();
		});

		it("should NOT have any inputs set", () => {
			expect(component.homeStateParams).toBeUndefined();
		});
	});

	describe("logoClickHandler()", () => {
		it("should navigate to Home", () => {
			const dummyClickEvent: SpyObj<Event> = createSpyObj("dummyClickEvent", ["preventDefault"]);

			component.homeStateParams = {
				someParam: "dummy param"
			};
			fixture.detectChanges();

			// routingService.navigateToHome is already an Spy
			(<Spy>component.routingService.navigateToHome).calls.reset();
			component.logoClickHandler(dummyClickEvent);
			expect(component.routingService.navigateToHome).toHaveBeenCalledTimes(1);
			expect(component.routingService.navigateToHome).toHaveBeenCalledWith(component.homeStateParams);
		});
	});
});
