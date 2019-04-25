import { Directive, HostListener, Inject, Input, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

/**
 * Name of the directive
 */
const directiveName: string = "[starkOnEnterKey]";

/**
 * Directive that allows the execution of a certain callback whenever the user presses the Enter key in a field.
 *
 * This directive is used essentially for input tags.
 *
 * `IMPORTANT:` This directive will have its own context so any properties/methods of the host component where this directive is used will not be accessible.
 * In case you want to access any variable or method of your component where you include this directive from the callback function,
 * you should bind the component's "this" context to the callback function passed to the directive with the "bind()" method.
 *
 * For example:
 * ```html
 * <input name="test" [starkOnEnterKey]="yourCallbackFn.bind(this)" [starkOnEnterKeyParams]="['someValue']">
 * ```
 *
 * Then in your component your callback could be defined like this:
 * ```typescript
 * public yourCallbackFn(paramValue: string): void {
 *      this.someProperty; // is the value of the component's "someProperty" due to the ".bind(this)" in the callback passed to the directive, otherwise it would be "undefined"!
 *      paramValue; // is "someValue" since it was a literal param passed via the [starkOnEnterKeyParams] input
 * }
 * ```
 */
@Directive({
	selector: directiveName
})
export class StarkOnEnterKeyDirective implements OnInit {
	/**
	 * Callback function to be triggered on every Enter key press in the field
	 */
	/* tslint:disable:no-input-rename */
	@Input("starkOnEnterKey")
	public onEnterKeyHandler: Function;

	/**
	 * Parameters to be passed to the specified callback function
	 */
	@Input("starkOnEnterKeyParams")
	public onEnterKeyParams: any[];

	/**
	 * Event handler to be invoked on a "keypress" event in the field
	 */
	@HostListener("keypress", ["$event"])
	public eventHandler(event: KeyboardEvent): void {
		if (this.onEnterKeyHandler && event.key === "Enter") {
			this.onEnterKeyHandler(...this.onEnterKeyParams);
			event.preventDefault();
		}
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
