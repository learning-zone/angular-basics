import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StarkAppFooterComponent } from "./components";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	declarations: [StarkAppFooterComponent],
	imports: [CommonModule, TranslateModule],
	exports: [StarkAppFooterComponent]
})
export class StarkAppFooterModule {}
