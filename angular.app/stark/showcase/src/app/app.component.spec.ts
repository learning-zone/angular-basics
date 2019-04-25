/* tslint:disable:completed-docs*/
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, TestBed, ComponentFixture } from "@angular/core/testing";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { STARK_APP_SIDEBAR_SERVICE } from "@nationalbankbelgium/stark-ui";
import { MockAppSidebarService } from "@nationalbankbelgium/stark-ui/testing";

/**
 * Load the implementations that should be tested
 */
import { AppComponent } from "./app.component";
import { STARK_LOGGING_SERVICE, STARK_ROUTING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService, MockStarkRoutingService } from "@nationalbankbelgium/stark-core/testing";
import Spy = jasmine.Spy;

describe(`App`, () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	/**
	 * async beforeEach
	 */
	beforeEach(async(() => {
		return (
			TestBed.configureTestingModule({
				declarations: [AppComponent],
				imports: [TranslateModule.forRoot()],
				schemas: [NO_ERRORS_SCHEMA],
				providers: [
					{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() },
					{ provide: STARK_ROUTING_SERVICE, useClass: MockStarkRoutingService },
					{ provide: STARK_APP_SIDEBAR_SERVICE, useValue: new MockAppSidebarService() },
					TranslateService
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
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;

		/**
		 * Trigger initial data binding
		 */
		fixture.detectChanges();
	});

	it(`should be readly initialized`, () => {
		expect(fixture).toBeDefined();
		expect(component).toBeDefined();
	});

	it("should log ngOnInit", () => {
		(<Spy>component.logger.debug).calls.reset();
		expect(component.logger.debug).not.toHaveBeenCalled();

		component.ngOnInit();
		expect(component.logger.debug).toHaveBeenCalled();
	});
});
