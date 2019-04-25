import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { STARK_LOGGING_SERVICE, StarkLoggingService } from "@nationalbankbelgium/stark-core";

@Component({
	selector: "showcase-demo-button",
	templateUrl: "./button.component.html",
	styleUrls: ["./button.component.scss"],
	encapsulation: ViewEncapsulation.None
})
export class ButtonComponent {
	public constructor(@Inject(STARK_LOGGING_SERVICE) public logger: StarkLoggingService) {}
}
