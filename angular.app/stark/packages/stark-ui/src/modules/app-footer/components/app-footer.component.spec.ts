/*tslint:disable:completed-docs*/
import { async, ComponentFixture, inject, TestBed } from "@angular/core/testing";
import { STARK_LOGGING_SERVICE } from "@nationalbankbelgium/stark-core";
import { MockStarkLoggingService } from "@nationalbankbelgium/stark-core/testing";
import { StarkAppFooterComponent } from "./app-footer.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

describe("AppLogoutComponent", () => {
	let component: StarkAppFooterComponent;
	let fixture: ComponentFixture<StarkAppFooterComponent>;

	const currentYear: string = new Date().getFullYear().toString();

	let translateService: TranslateService;
	/**
	 * async beforeEach
	 */
	beforeEach(async(() => {
		return (
			TestBed.configureTestingModule({
				imports: [TranslateModule.forRoot()],
				declarations: [StarkAppFooterComponent],
				providers: [{ provide: STARK_LOGGING_SERVICE, useValue: new MockStarkLoggingService() }, TranslateService]
			})
				/**
				 * Compile template and css
				 */
				.compileComponents()
		);
	}));

	// Inject module dependencies
	beforeEach(inject([TranslateService], (_translateService: TranslateService) => {
		translateService = _translateService;
		translateService.addLangs(["en", "fr", "nl", "de"]);
		translateService.setDefaultLang("en");
	}));

	/**
	 * Synchronous beforeEach
	 */
	beforeEach(() => {
		fixture = TestBed.createComponent(StarkAppFooterComponent);
		component = fixture.componentInstance;

		// inputs
		component.legalInfoUrl = "legal-info";
		component.helpPageUrl = "help-page";

		fixture.detectChanges(); // trigger initial data binding
	});

	describe("on initialization", () => {
		it("should set internal component properties", () => {
			expect(fixture).toBeDefined();
			expect(component).toBeDefined();

			expect(component.logger).not.toBeNull();
			expect(component.logger).toBeDefined();

			expect(component.$translate).not.toBeNull();
			expect(component.$translate).toBeDefined();
		});

		it("should have been initialized", () => {
			component.ngOnInit();

			expect(component.legalInfoUrl).not.toBeNull();
			expect(component.legalInfoUrl).toBeDefined();
			expect(component.legalInfoUrl).toBe("legal-info");

			expect(component.helpPageUrl).not.toBeNull();
			expect(component.helpPageUrl).toBeDefined();
			expect(component.helpPageUrl).toBe("help-page");

			expect(component.copyrightPeriod).not.toBeNull();
			expect(component.copyrightPeriod).toBeDefined();
			expect(component.copyrightPeriod).toBe("STARK.APP_FOOTER.COPYRIGHT_YEAR - " + currentYear);
		});
	});

	describe("getCopyrightYear()", () => {
		it("should give back copyright year", () => {
			// routingService.navigateTo is already a Spy
			const cYear: string = component.getCopyrightYear();

			expect(cYear).toBeDefined();
			expect(cYear).toBe("STARK.APP_FOOTER.COPYRIGHT_YEAR");
		});
	});

	describe("getCopyrightPeriod()", () => {
		it("should give back copyright period", () => {
			// routingService.navigateTo is already a Spy
			let cPeriod: string = component.getCopyrightPeriod("toto");

			expect(cPeriod).toBeDefined();
			expect(cPeriod).toBe("toto - " + currentYear);

			cPeriod = component.getCopyrightPeriod(currentYear);

			expect(cPeriod).toBeDefined();
			expect(cPeriod).toBe(currentYear);
		});
	});
});
