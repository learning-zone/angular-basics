import { Component, Inject } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

@Component({
	selector: "showcase-demo-on-enter-key",
	styleUrls: ["./keyboard-directives.component.scss"],
	templateUrl: "./keyboard-directives.component.html"
})
export class KeyboardDirectivesComponent {
	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}
}
