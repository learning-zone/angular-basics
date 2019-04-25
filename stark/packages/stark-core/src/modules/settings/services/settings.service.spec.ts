/*tslint:disable:completed-docs*/
import { Store } from "@ngrx/store";
import { StarkLoggingService } from "../../logging/services";
import { MockStarkLoggingService } from "../../logging/testing";
import { StarkSessionService } from "../../session/services";
import { MockStarkSessionService } from "../../session/testing";
import {
	StarkApplicationConfig,
	StarkApplicationConfigImpl,
	StarkApplicationMetadata,
	StarkApplicationMetadataImpl,
	StarkLanguage,
	StarkLanguageImpl,
	StarkLanguages
} from "../../../configuration/entities";
import { StarkCoreApplicationState } from "../../../common/store";
import { StarkSettingsServiceImpl } from "./settings.service";
import { StarkSetPreferredLanguage } from "../actions";
import { StarkUser } from "../../user/entities";
import { of } from "rxjs";
import Spy = jasmine.Spy;
import SpyObj = jasmine.SpyObj;

describe("Service: StarkSettingsService", () => {
	let mockStore: SpyObj<Store<StarkCoreApplicationState>>;
	let mockLogger: StarkLoggingService;
	let appConfig: StarkApplicationConfig;
	let appMetadata: StarkApplicationMetadata;
	let settingsService: StarkSettingsServiceImpl;
	let mockSessionService: StarkSessionService;
	let mockUser: StarkUser;
	let browserLanguageCode: string;

	beforeEach(() => {
		mockLogger = new MockStarkLoggingService();
		mockStore = jasmine.createSpyObj<Store<StarkCoreApplicationState>>("store", ["dispatch"]);
		appConfig = new StarkApplicationConfigImpl();
		appConfig.defaultLanguage = "en";
		appMetadata = new StarkApplicationMetadataImpl();
		appMetadata.supportedLanguages = [StarkLanguages.FR_BE, StarkLanguages.EN_US];

		mockUser = {
			uuid: "1",
			username: "tenretc",
			roles: [],
			firstName: "Corentin",
			lastName: "Tenret",
			language: "FR",
			email: "tenretc@nbb.be",
			referenceNumber: "1234"
		};

		mockSessionService = new MockStarkSessionService();
		(<Spy>mockSessionService.getCurrentUser).and.returnValue(of(mockUser));

		settingsService = new StarkSettingsServiceImpl(mockLogger, mockSessionService, appMetadata, appConfig, mockStore);
		// reset the calls counter because there is a log in the constructor
		mockStore.dispatch.calls.reset();
	});
	describe("on initialization", () => {
		it("should throw an error in case the defaultLanguage in the app config is invalid", () => {
			const invalidDefaultLanguageValues: string[] = [<any>undefined, "EN", "english"];

			for (const invalidDefaultLanguage of invalidDefaultLanguageValues) {
				appConfig.defaultLanguage = invalidDefaultLanguage;

				expect(() => new StarkSettingsServiceImpl(mockLogger, mockSessionService, appMetadata, appConfig, mockStore)).toThrowError(
					/defaultLanguage/
				);
			}
		});

		it("should throw an error in case the supportedLanguages in the app metadata is invalid", () => {
			const invalidSupportedLanguagesValues: StarkLanguage[][] = [
				<any>undefined,
				[],
				[new StarkLanguageImpl(<any>undefined, "whatever")],
				[new StarkLanguageImpl("", "whatever")],
				[new StarkLanguageImpl("fr", "whatever")],
				[new StarkLanguageImpl("fr-be", "whatever")],
				[new StarkLanguageImpl("es-MX", "whatever")],
				[new StarkLanguageImpl("whatever", <any>undefined)],
				[new StarkLanguageImpl("whatever", "")]
			];

			for (const invalidSupportedLanguage of invalidSupportedLanguagesValues) {
				appMetadata.supportedLanguages = invalidSupportedLanguage;

				expect(() => new StarkSettingsServiceImpl(mockLogger, mockSessionService, appMetadata, appConfig, mockStore)).toThrowError(
					/supportedLanguages/
				);
			}
		});

		it("preferredLanguage should be undefined", () => {
			expect(settingsService.preferredLanguage).toBe(appConfig.defaultLanguage);
		});
	});

	describe("initializeSettings", () => {
		beforeEach(() => {
			Object.defineProperty(navigator, "language", {
				get: () => "fr-be"
			});
			browserLanguageCode = "fr";
		});

		it("should set user language as preferred language", () => {
			settingsService.initializeSettings();
			expect(settingsService.preferredLanguage).toEqual((<string>mockUser.language).toLowerCase());
		});

		it("should set browser language as preferred language if user language is undefined OR null", () => {
			// tslint:disable-next-line:no-null-keyword */
			mockUser.language = <any>null;
			(<Spy>mockSessionService.getCurrentUser).and.returnValue(of(mockUser));
			settingsService.initializeSettings();
			expect(settingsService.preferredLanguage).toEqual(browserLanguageCode);

			mockUser.language = undefined;
			(<Spy>mockSessionService.getCurrentUser).and.returnValue(of(mockUser));
			settingsService.initializeSettings();
			expect(settingsService.preferredLanguage).toEqual(browserLanguageCode);
		});

		it("should set browser language as preferred language if user language is NOT in supported languages", () => {
			mockUser.language = "NL";
			(<Spy>mockSessionService.getCurrentUser).and.returnValue(of(mockUser));
			settingsService.initializeSettings();
			expect(settingsService.preferredLanguage).toEqual(browserLanguageCode);
		});

		it("should set defaultLanguage if browserLanguage not supported", () => {
			appMetadata.supportedLanguages = [];
			settingsService.initializeSettings();
			expect(settingsService.preferredLanguage).toEqual(appConfig.defaultLanguage);
		});
	});

	describe("getPreferredLanguage", () => {
		it("should return the preferred language", () => {
			const getPreferredLanguage: string = settingsService.getPreferredLanguage();
			expect(getPreferredLanguage).toEqual(appConfig.defaultLanguage);
		});
	});

	describe("setPreferredLanguage", () => {
		it("should change the language successfully and dispatch the SUCCESS action", () => {
			settingsService.setPreferredLanguage("NL");

			expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
			expect(mockStore.dispatch.calls.argsFor(0)[0]).toEqual(new StarkSetPreferredLanguage("NL"));
			expect(settingsService.preferredLanguage).toEqual("NL");
		});
	});
});
