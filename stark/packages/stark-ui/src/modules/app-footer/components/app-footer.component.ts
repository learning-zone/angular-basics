import { Component, HostBinding, Inject, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

/**
 * Name of the component
 */
const componentName: string = "stark-app-footer";

/**
 * Component to display the application's footer.
 */
@Component({
	selector: "stark-app-footer",
	templateUrl: "./app-footer.component.html"
})
export class StarkAppFooterComponent implements OnInit {
	/**
	 * Adds class="stark-app-footer" attribute on the host component
	 */
	@HostBinding("class")
	public class: string = componentName;

	/**
	 * Url for the Legal Information
	 */
	@Input()
	public legalInfoUrl?: string;

	/**
	 * Url for the help page
	 */
	@Input()
	public helpPageUrl?: string;

	/**
	 * Copyright period displayed.
	 */
	public copyrightPeriod: string;

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 * @param $translate - The translation service
	 */
	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService, public $translate: TranslateService) {
		// empty constructor
	}

	/**
	 * Component lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(componentName + ": controller initialized");

		// get the copyright period based on the value in translation file
		this.copyrightPeriod = this.getCopyrightPeriod(this.getCopyrightYear());
	}

	/**
	 * Creates and format the copyright period based on the starting year.
	 * @returns The copyright period string
	 * @param startYear - The starting year of the copyright
	 */
	public getCopyrightPeriod(startYear: string): string {
		const currentYear: string = new Date().getFullYear().toString();
		if (startYear === currentYear) {
			return startYear;
		} else {
			return startYear + " - " + currentYear;
		}
	}

	/**
	 * Get the copyright year located in the translation file
	 * @returns The copyright year string
	 */
	public getCopyrightYear(): string {
		return this.$translate.instant("STARK.APP_FOOTER.COPYRIGHT_YEAR");
	}
}
