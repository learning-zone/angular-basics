import { Component, Inject, Input, OnInit, OnDestroy, ViewEncapsulation, Renderer2, ElementRef } from "@angular/core";
import { DateAdapter } from "@angular/material/core";
import { Subscription } from "rxjs/Rx";

import {
	STARK_APP_METADATA,
	StarkApplicationMetadata,
	STARK_LOGGING_SERVICE,
	StarkLoggingService,
	STARK_SESSION_SERVICE,
	StarkSessionService,
	StarkLanguage
} from "@nationalbankbelgium/stark-core";
import { AbstractStarkUiComponent } from "../../../common/classes/abstract-component";

/**
 * Name of the component
 */
const componentName: string = "stark-language-selector";

export type StarkLanguageSelectorMode = "dropdown" | "toolbar";

/**
 * Component to select the application's language from a list of available languages passed as parameter.
 */
@Component({
	selector: "stark-language-selector",
	templateUrl: "./language-selector.component.html",
	encapsulation: ViewEncapsulation.None,
	// We need to use host instead of @HostBinding: https://github.com/NationalBankBelgium/stark/issues/664
	host: {
		class: componentName
	}
})
export class StarkLanguageSelectorComponent extends AbstractStarkUiComponent implements OnInit, OnDestroy {
	/**
	 * HTML id of action bar component.
	 */
	@Input()
	public languageSelectorId: string = "";

	/**
	 * In which 'mode' the language selector is displayed: dropdown / toolbar
	 */
	@Input()
	public mode: StarkLanguageSelectorMode;

	/**
	 * The currently selected language
	 */
	@Input()
	public selectedLanguage: string;

	/**
	 * A reference to the sessionService subscription, needed to unsubscribe upon destroy.
	 */
	private sessionServiceSubscription: Subscription;

	/**
	 * Class constructor
	 * @param appMetadata - The Metadata of the application the contains the supportedLanguages
	 * @param logger - The logger of the application
	 * @param sessionService - The session service of the application
	 * @param dateAdapter - Needed to change the locale of the DateAdapter
	 * @param renderer - Angular Renderer wrapper for DOM manipulations.
	 * @param elementRef - Reference to the DOM element where this directive is applied to.
	 */
	public constructor(
		@Inject(STARK_APP_METADATA) public appMetadata: StarkApplicationMetadata,
		@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService,
		@Inject(STARK_SESSION_SERVICE) public sessionService: StarkSessionService,
		public dateAdapter: DateAdapter<any>,
		protected renderer: Renderer2,
		protected elementRef: ElementRef
	) {
		super(renderer, elementRef);
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": controller initialized");

		this.sessionServiceSubscription = this.sessionService
			.getCurrentLanguage()
			.subscribe(
				(language: string) => (this.selectedLanguage = language),
				() => this.logger.error(componentName + ": an error occurred getting the current language.")
			);
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnDestroy(): void {
		if (this.sessionServiceSubscription) {
			this.sessionServiceSubscription.unsubscribe();
		}
	}

	/**
	 * Change the current language based on the selection made by the user
	 */
	public changeLanguage(language: string): void {
		if (this.selectedLanguage !== language) {
			this.logger.debug(componentName + ": setting session current language => " + language);
			this.selectedLanguage = language;
			this.sessionService.setCurrentLanguage(this.selectedLanguage);

			const languageIndex: number = this.appMetadata.supportedLanguages.findIndex((starkLanguage: StarkLanguage) => {
				return starkLanguage.code === this.selectedLanguage;
			});

			if (languageIndex >= 0) {
				const locale: string = this.appMetadata.supportedLanguages[languageIndex].isoCode;
				this.dateAdapter.setLocale(locale);
				this.logger.debug(componentName + ": locale changed to => " + locale);
			}
		}
	}

	/**
	 * @ignore
	 */
	public trackLanguage(_index: number, language: StarkLanguage): string {
		return language.isoCode;
	}
}
