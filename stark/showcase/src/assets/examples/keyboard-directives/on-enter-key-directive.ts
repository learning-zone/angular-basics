import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

@Component({
	selector: "showcase-demo-on-enter-key",
	styleUrls: ["./on-enter-key.component.scss"],
	templateUrl: "./on-enter-key.component.html"
})
export class OnEnterKeyComponent implements OnInit {
	public latestInputValue: string;
	public inputValue1: string;
	public inputValue2: string;
	public inputValue3: string;

	public logging: string;

	public constructor(@Inject(STARK_LOGGING_SERVICE) private logger: StarkLoggingService) {}

	public ngOnInit(): void {
		this.latestInputValue = "";
		this.inputValue1 = "";
		this.inputValue2 = "";
		this.inputValue3 = "";
		this.logging = "";
	}

	public onEnterKeyCallback(...paramValues: any[]): void {
		if (typeof this.latestInputValue !== "undefined") {
			this.latestInputValue = paramValues[1];
		}

		let callbackLogging: string = `Callback triggered from ${paramValues[0]}!`;
		callbackLogging += ` - Passed params: ${paramValues}`;
		callbackLogging += ` - Component this.latestInputValue property: '${this.latestInputValue}'\n`;

		// this won't appear in the view when no context is passed to this callback function
		this.logging += callbackLogging;
		// this will always be logged to the console since the directive has also the "logger" service injected
		this.logger.debug(callbackLogging);

		if (paramValues.length === 5) {
			// the context of the host component was passed in the last parameter
			// so we can change the component's property to update the logging section
			const parentComponentContext: OnEnterKeyComponent = paramValues[4];
			parentComponentContext.logging += callbackLogging;
		}
	}
}
