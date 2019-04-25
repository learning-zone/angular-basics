import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StarkPrettyPrintComponent } from "./components";

@NgModule({
	declarations: [StarkPrettyPrintComponent],
	imports: [CommonModule],
	exports: [StarkPrettyPrintComponent]
})
export class StarkPrettyPrintModule {}
