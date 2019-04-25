/* tslint:disable:completed-docs*/
import { Inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { filter } from "rxjs/operators";

import { STARK_LOGGING_SERVICE, StarkLoggingService } from "../../logging/services";
import { STARK_SESSION_SERVICE, StarkSessionService } from "../../session/services";
import { StarkSettingsService, starkSettingsServiceName } from "./settings.service.intf";
import { StarkSetPreferredLanguage } from "../actions";
import {
	STARK_APP_CONFIG,
	STARK_APP_METADATA,
	StarkApplicationConfig,
	StarkApplicationMetadata,
	StarkLanguage
} from "../../../configuration/entities";
import { StarkUser } from "../../user/entities";
import { StarkCoreApplicationState } from "../../../common/store";
import { StarkConfigurationUtil } from "../../../util/configuration.util";

/**
 * @ignore
 * @ngdoc service
 * @description Service that allows the manipulation of application settings, some of which can be persisted.
 */
@Injectable()
export class StarkSettingsServiceImpl implements StarkSettingsService {
	public preferredLanguage: string;

	public constructor(
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_SESSION_SERVICE) public sessionService: StarkSessionService,
		@Inject(STARK_APP_METADATA) private appMetadata: StarkApplicationMetadata,
		@Inject(STARK_APP_CONFIG) private appConfig: StarkApplicationConfig,
		public store: Store<StarkCoreApplicationState>
	) {
		// ensuring that the app config and metadata are valid before doing anything
		StarkConfigurationUtil.validateConfig(this.appConfig, ["settings"], starkSettingsServiceName);
		StarkConfigurationUtil.validateMetadata(this.appMetadata, ["settings"], starkSettingsServiceName);

		this.preferredLanguage = this.appConfig.defaultLanguage;

		this.logger.debug(starkSettingsServiceName + " loaded");
	}

	public initializeSettings(): void {
		this.sessionService
			.getCurrentUser()
			.pipe(filter((user?: StarkUser): user is StarkUser => typeof user !== "undefined"))
			.subscribe((user: StarkUser) => {
				let supportedLanguageIndex: number = -1;
				const browserLanguage: string = navigator.language || navigator["userLanguage"] || "";

				if (user.language) {
					supportedLanguageIndex = this.findMatchingSupportedLanguage(user.language);
				}

				if (supportedLanguageIndex === -1) {
					supportedLanguageIndex = this.findMatchingSupportedLanguage(browserLanguage);

					if (supportedLanguageIndex === -1) {
						const browserLanguageCode: string = browserLanguage.split("-")[0];
						supportedLanguageIndex = this.findMatchingSupportedLanguage(browserLanguageCode);
					}
				}

				if (supportedLanguageIndex !== -1) {
					this.setPreferredLanguage(this.appMetadata.supportedLanguages[supportedLanguageIndex].code);
				} else {
					this.setPreferredLanguage(this.appConfig.defaultLanguage);
				}
			});
	}

	public persistPreferredLanguage(): void {
		// implement
	}

	public getPreferredLanguage(): string {
		return this.preferredLanguage;
	}

	public setPreferredLanguage(language: string): void {
		this.preferredLanguage = language;
		this.store.dispatch(new StarkSetPreferredLanguage(language));
	}

	public findMatchingSupportedLanguage(language: string): number {
		return this.appMetadata.supportedLanguages.findIndex((supportedLanguage: StarkLanguage) => {
			return (
				supportedLanguage.isoCode.toLowerCase() === language.toLowerCase() ||
				supportedLanguage.code.toLowerCase() === language.toLowerCase()
			);
		});
	}
}
