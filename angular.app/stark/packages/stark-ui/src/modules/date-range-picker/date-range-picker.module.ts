import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StarkDatePickerModule } from "../date-picker";
import { StarkDateRangePickerComponent } from "./components";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	declarations: [StarkDateRangePickerComponent],
	imports: [CommonModule, StarkDatePickerModule, TranslateModule],
	exports: [StarkDateRangePickerComponent]
})
export class StarkDateRangePickerModule {}
