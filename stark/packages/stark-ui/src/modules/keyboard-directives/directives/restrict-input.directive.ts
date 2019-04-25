import { Directive, HostListener, Inject, Input, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

/**
 * Name of the directive
 */
const directiveName: string = "[starkRestrictInput]";

/**
 * Directive to restrict the characters that can be typed in a field to allow only those matching a regex pattern.
 */
@Directive({
	selector: directiveName
})
export class StarkRestrictInputDirective implements OnInit {
	/**
	 * A valid regular expression that defines the allowed characters
	 */
	/* tslint:disable:no-input-rename */
	@Input("starkRestrictInput")
	public inputRestriction: string;

	/**
	 * Event handler to be invoked on a "keypress" event in the field
	 */
	@HostListener("keypress", ["$event"])
	public eventHandler(event: KeyboardEvent): boolean {
		const regularExpression: string = this.inputRestriction || "";

		if (regularExpression) {
			// some browsers return the special key value (i.e. keys in the numeric keypad), in such cases we use the 'char'
			// see: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
			/* tslint:disable-next-line:deprecation */
			const key: string = event.key.length > 1 ? event.char : event.key;
			const regex: RegExp = new RegExp(regularExpression);

			if (!regex.test(key)) {
				event.preventDefault();
				return false;
			}
		} else {
			this.logger.warn(directiveName + ": no input restriction defined");
		}

		return true;
	}

	/**
	 * Class constructor
	 * @param logger - The logger of the application
	 */
	public constructor(@Inject(STARK_LOGGING_SERVICE) private logger: StarkLoggingService) {}

	/**
	 * Directive lifecycle hook
	 */
	public ngOnInit(): void {
		this.logger.debug(directiveName + ": directive initialized");
	}
}
