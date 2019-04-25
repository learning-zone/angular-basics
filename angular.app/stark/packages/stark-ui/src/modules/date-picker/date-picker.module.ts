import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDatepickerModule, MatInputModule } from "@angular/material";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { StarkDatePickerComponent } from "./components";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	declarations: [StarkDatePickerComponent],
	imports: [CommonModule, MatDatepickerModule, MatInputModule, MatMomentDateModule, TranslateModule],
	exports: [StarkDatePickerComponent]
})
export class StarkDatePickerModule {}
