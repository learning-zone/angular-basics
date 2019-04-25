import { NgModule } from "@angular/core";
import { StarkDropdownComponent } from "./components";
import { TranslateModule } from "@ngx-translate/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
	declarations: [StarkDropdownComponent],
	imports: [CommonModule, TranslateModule, FormsModule, MatSelectModule, MatOptionModule, BrowserAnimationsModule],
	exports: [StarkDropdownComponent]
})
export class StarkDropdownModule {}
