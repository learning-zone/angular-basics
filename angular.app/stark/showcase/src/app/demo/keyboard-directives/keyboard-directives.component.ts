import { Component, Inject, OnInit } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

@Component({
	selector: "showcase-demo-on-enter-key",
	styleUrls: ["./keyboard-directives.component.scss"],
	templateUrl: "./keyboard-directives.component.html"
})
export class KeyboardDirectivesComponent implements OnInit {
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
		switch (paramValues[0]) {
			case "input1":
				this.updateLogging(this.inputValue1, paramValues);
				break;
			case "input2":
				// this.updateLogging() is not accessible since this onEnterKeyCallback is called without context
				let callbackLogging: string = `Callback triggered from ${paramValues[0]}!`;
				callbackLogging += ` - Passed params: ${paramValues}`;
				callbackLogging += ` - Component this.latestInputValue property: '${this.latestInputValue}'\n`;
				// however this.logger is accessible because the OnEnterKey directive has also the "logger" service injected
				this.logger.debug(callbackLogging);
				break;
			case "input3":
				// this.updateLogging() is not accessible since this onEnterKeyCallback is called without context
				if (paramValues.length === 5) {
					// the context of the host component was passed in the last parameter
					// so we can access all properties/methods from the component
					const parentComponentContext: KeyboardDirectivesComponent = paramValues[4];
					parentComponentContext.updateLogging(parentComponentContext.inputValue3, paramValues);
				}
				break;
			default:
				break;
		}
	}

	public updateLogging(inputValue: string, paramValues: any[]): void {
		if (typeof this.latestInputValue !== "undefined") {
			this.latestInputValue = inputValue;
		}

		let callbackLogging: string = `Callback triggered from ${paramValues[0]}!`;
		callbackLogging += ` - Passed params: ${paramValues}`;
		callbackLogging += ` - Component this.latestInputValue property: '${this.latestInputValue}'\n`;

		// this won't appear in the view when no context is passed to this callback function
		this.logging += callbackLogging;
		this.logger.debug(callbackLogging);
	}
}
