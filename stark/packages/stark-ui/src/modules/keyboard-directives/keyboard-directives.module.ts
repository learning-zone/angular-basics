import { NgModule } from "@angular/core";
import { StarkOnEnterKeyDirective, StarkRestrictInputDirective } from "./directives";

@NgModule({
	declarations: [StarkOnEnterKeyDirective, StarkRestrictInputDirective],
	exports: [StarkOnEnterKeyDirective, StarkRestrictInputDirective]
})
export class StarkKeyboardDirectivesModule {}
