import { NgModule } from "@angular/core";
import { StarkSvgViewBoxDirective } from "./directives";

@NgModule({
	declarations: [StarkSvgViewBoxDirective],
	exports: [StarkSvgViewBoxDirective]
})
export class StarkSvgViewBoxModule {}
