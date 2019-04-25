/*tslint:disable:completed-docs*/
import { StarkConfigurationUtil, StarkConfigValidationGroups, StarkMetadataValidationGroups } from "./configuration.util";
import {
	STARK_APP_CONFIG,
	STARK_APP_METADATA,
	StarkApplicationConfig,
	StarkApplicationConfigImpl,
	StarkApplicationMetadata,
	StarkApplicationMetadataImpl,
	StarkLanguageImpl
} from "../configuration/entities";
import { StarkBackendAuthenticationTypes, StarkBackendImpl } from "../modules/http/entities/backend";

// tslint:disable-next-line:no-big-function
describe("Util: ConfigurationUtil", () => {
	const errorMessagePrefix: string = "some prefix";
	const configErrorMessage: RegExp = new RegExp(STARK_APP_CONFIG.toString() + " constant is not valid");
	const metadataErrorMessage: RegExp = new RegExp(STARK_APP_METADATA.toString() + " constant is not valid");

	function testConfigByValidationGroup(
		validationGroup: StarkConfigValidationGroups,
		initializeValidConfigFn: (appConfig: StarkApplicationConfig) => void,
		assertValidConfigFn: (appConfig: StarkApplicationConfig) => void,
		initializeInvalidConfigFn: (appConfig: StarkApplicationConfig) => void,
		assertInvalidConfigFn: (appConfig: StarkApplicationConfig, isInitialized: boolean) => void
	): void {
		describe("group: " + validationGroup, () => {
			let appConfig: StarkApplicationConfig;

			beforeEach(() => {
				appConfig = new StarkApplicationConfigImpl();
			});

			it("should NOT throw any error when the AppConfig is valid for the given group", () => {
				initializeValidConfigFn(appConfig);
				assertValidConfigFn(appConfig);

				expect(() => StarkConfigurationUtil.validateConfig(appConfig, [validationGroup], errorMessagePrefix)).not.toThrow();
			});

			it("should THROW an error when the AppConfig is NOT valid for the given group", () => {
				assertInvalidConfigFn(appConfig, false);

				expect(() => StarkConfigurationUtil.validateConfig(appConfig, [validationGroup], errorMessagePrefix)).toThrowError(
					configErrorMessage
				);
			});

			it("should THROW an error when the AppConfig has been initialized but it is NOT valid for the given group", () => {
				initializeInvalidConfigFn(appConfig);
				assertInvalidConfigFn(appConfig, true);

				expect(() => StarkConfigurationUtil.validateConfig(appConfig, [validationGroup], errorMessagePrefix)).toThrowError(
					configErrorMessage
				);
			});
		});
	}

	function testMetadataByValidationGroup(
		validationGroup: StarkMetadataValidationGroups,
		initializeValidConfigFn: (appMetadata: StarkApplicationMetadata) => void,
		assertValidConfigFn: (appMetadata: StarkApplicationMetadata) => void,
		initializeInvalidConfigFn: (appMetadata: StarkApplicationMetadata) => void,
		assertInvalidConfigFn: (appMetadata: StarkApplicationMetadata, isInitialized: boolean) => void
	): void {
		describe("group: " + validationGroup, () => {
			let appMetadata: StarkApplicationMetadata;

			beforeEach(() => {
				appMetadata = new StarkApplicationMetadataImpl();
			});

			it("should NOT throw any error when the appMetadata is valid for the given group", () => {
				initializeValidConfigFn(appMetadata);
				assertValidConfigFn(appMetadata);

				expect(() => StarkConfigurationUtil.validateMetadata(appMetadata, [validationGroup], errorMessagePrefix)).not.toThrow();
			});

			it("should THROW an error when the appMetadata is NOT valid for the given group", () => {
				assertInvalidConfigFn(appMetadata, false);

				expect(() => StarkConfigurationUtil.validateMetadata(appMetadata, [validationGroup], errorMessagePrefix)).toThrowError(
					metadataErrorMessage
				);
			});

			it("should THROW an error when the appMetadata has been initialized but it is NOT valid for the given group", () => {
				initializeInvalidConfigFn(appMetadata);
				assertInvalidConfigFn(appMetadata, true);

				expect(() => StarkConfigurationUtil.validateMetadata(appMetadata, [validationGroup], errorMessagePrefix)).toThrowError(
					metadataErrorMessage
				);
			});
		});
	}

	describe("validateConfig", () => {
		testConfigByValidationGroup(
			"logging",
			(appConfig: StarkApplicationConfig) => {
				appConfig.debugLoggingEnabled = true;
				appConfig.loggingFlushApplicationId = "dummy";
			},
			(appConfig: StarkApplicationConfig) => {
				expect(appConfig.debugLoggingEnabled).toBeDefined();
				expect(appConfig.loggingFlushApplicationId).toBeDefined();
				// properties that are always defined due to the defaults set in the constructor
				expect(appConfig.loggingFlushResourceName).toBeDefined();
				expect(appConfig.loggingFlushPersistSize).toBeDefined();
				expect(appConfig.loggingFlushDisabled).toBeDefined();
			},
			(appConfig: StarkApplicationConfig) => {
				appConfig.loggingFlushApplicationId = <any>123;
			},
			(appConfig: StarkApplicationConfig, isInitialized: boolean) => {
				if (isInitialized) {
					expect(appConfig.loggingFlushApplicationId).toBeDefined();
				} else {
					expect(appConfig.debugLoggingEnabled).toBeUndefined();
					expect(appConfig.loggingFlushApplicationId).toBeUndefined();
				}
				// properties that are always defined due to the defaults set in the constructor
				expect(appConfig.loggingFlushResourceName).toBeDefined();
				expect(appConfig.loggingFlushPersistSize).toBeDefined();
				expect(appConfig.loggingFlushDisabled).toBeDefined();
			}
		);

		testConfigByValidationGroup(
			"routing",
			(appConfig: StarkApplicationConfig) => {
				appConfig.homeStateName = "dummy";
			},
			(appConfig: StarkApplicationConfig) => {
				expect(appConfig.homeStateName).toBeDefined();
			},
			(appConfig: StarkApplicationConfig) => {
				appConfig.homeStateName = <any>123;
			},
			(appConfig: StarkApplicationConfig, isInitialized: boolean) => {
				if (isInitialized) {
					expect(appConfig.homeStateName).toBeDefined();
				} else {
					expect(appConfig.homeStateName).toBeUndefined();
				}
			}
		);

		testConfigByValidationGroup(
			"session",
			(appConfig: StarkApplicationConfig) => {
				appConfig.keepAliveUrl = "http://some.backend/keepalive";
				appConfig.logoutUrl = "http://some.backend/logout";
				appConfig.publicApp = true;
			},
			(appConfig: StarkApplicationConfig) => {
				expect(appConfig.keepAliveUrl).toBeDefined();
				expect(appConfig.logoutUrl).toBeDefined();
				expect(appConfig.publicApp).toBeDefined();
				// properties that are always defined due to the defaults set in the constructor
				expect(appConfig.sessionTimeout).toBeDefined();
				expect(appConfig.sessionTimeoutWarningPeriod).toBeDefined();
				expect(appConfig.keepAliveInterval).toBeDefined();
				expect(appConfig.keepAliveDisabled).toBeDefined();
			},
			(appConfig: StarkApplicationConfig) => {
				appConfig.keepAliveUrl = "invalid url";
				appConfig.logoutUrl = "another invalid url";
			},
			(appConfig: StarkApplicationConfig, isInitialized: boolean) => {
				if (isInitialized) {
					expect(appConfig.keepAliveUrl).toBeDefined();
					expect(appConfig.logoutUrl).toBeDefined();
				} else {
					expect(appConfig.keepAliveUrl).toBeUndefined();
					expect(appConfig.logoutUrl).toBeUndefined();
					expect(appConfig.publicApp).toBeUndefined();
				}
				// properties that are always defined due to the defaults set in the constructor
				expect(appConfig.sessionTimeout).toBeDefined();
				expect(appConfig.sessionTimeoutWarningPeriod).toBeDefined();
				expect(appConfig.keepAliveInterval).toBeDefined();
				expect(appConfig.keepAliveDisabled).toBeDefined();
			}
		);

		testConfigByValidationGroup(
			"settings",
			(appConfig: StarkApplicationConfig) => {
				appConfig.defaultLanguage = "en";
			},
			(appConfig: StarkApplicationConfig) => {
				expect(appConfig.defaultLanguage).toBeDefined();
			},
			(appConfig: StarkApplicationConfig) => {
				appConfig.defaultLanguage = "english";
			},
			(appConfig: StarkApplicationConfig, isInitialized: boolean) => {
				if (isInitialized) {
					expect(appConfig.defaultLanguage).toBeDefined();
				} else {
					expect(appConfig.defaultLanguage).toBeUndefined();
				}
			}
		);

		testConfigByValidationGroup(
			"http",
			(appConfig: StarkApplicationConfig) => {
				appConfig.addBackend({
					name: "dummy backend",
					url: "http://localhost:5000/",
					authenticationType: StarkBackendAuthenticationTypes.PUBLIC,
					devAuthenticationEnabled: true,
					devAuthenticationRolePrefix: "dummy prefix"
				});
			},
			(appConfig: StarkApplicationConfig) => {
				expect(appConfig.backends.size).toBe(1);
			},
			(appConfig: StarkApplicationConfig) => {
				const invalidBackend: StarkBackendImpl = new StarkBackendImpl();
				invalidBackend.name = "";
				invalidBackend.url = "invalid url";

				appConfig.backends.set("dummy backend", invalidBackend);
			},
			(appConfig: StarkApplicationConfig, isInitialized: boolean) => {
				if (isInitialized) {
					expect(appConfig.backends.size).toBe(1);
				} else {
					expect(appConfig.backends.size).toBe(0);
				}
			}
		);

		describe("group: undefined or unknown", () => {
			let appConfig: StarkApplicationConfig;

			beforeEach(() => {
				appConfig = new StarkApplicationConfigImpl();
			});

			it("should NOT throw any error when the AppConfig is validated without specifying a group", () => {
				expect(() => StarkConfigurationUtil.validateConfig(appConfig, [], errorMessagePrefix)).not.toThrow();
			});

			it("should NOT throw any error when the AppConfig is validated with an unknown group", () => {
				expect(() => StarkConfigurationUtil.validateConfig(appConfig, [<any>"whatever"], errorMessagePrefix)).not.toThrow();
			});
		});
	});

	describe("validateMetadata", () => {
		testMetadataByValidationGroup(
			"settings",
			(appMetadata: StarkApplicationMetadata) => {
				appMetadata.supportedLanguages = [new StarkLanguageImpl("fr-BE", "french")];
			},
			(appMetadata: StarkApplicationMetadata) => {
				expect(appMetadata.supportedLanguages.length).toBe(1);
			},
			(appMetadata: StarkApplicationMetadata) => {
				appMetadata.supportedLanguages = [new StarkLanguageImpl("es-MX", "whatever")];
			},
			(appMetadata: StarkApplicationMetadata, isInitialized: boolean) => {
				if (isInitialized) {
					expect(appMetadata.supportedLanguages.length).toBe(1);
				} else {
					expect(appMetadata.supportedLanguages.length).toBe(0);
				}
			}
		);

		describe("group: undefined or unknown", () => {
			let appMetadata: StarkApplicationMetadata;

			beforeEach(() => {
				appMetadata = new StarkApplicationMetadataImpl();
			});

			it("should NOT throw any error when the appMetadata is validated without specifying a group", () => {
				expect(() => StarkConfigurationUtil.validateMetadata(appMetadata, [], errorMessagePrefix)).not.toThrow();
			});

			it("should NOT throw any error when the appMetadata is validated with an unknown group", () => {
				expect(() => StarkConfigurationUtil.validateMetadata(appMetadata, [<any>"whatever"], errorMessagePrefix)).not.toThrow();
			});
		});
	});
});
