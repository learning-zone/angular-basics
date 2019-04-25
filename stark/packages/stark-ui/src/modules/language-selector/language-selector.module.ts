import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { StarkLanguageSelectorComponent } from "./components";
import { StarkDropdownModule } from "../dropdown";

@NgModule({
	declarations: [StarkLanguageSelectorComponent],
	imports: [CommonModule, MatButtonToggleModule, StarkDropdownModule],
	exports: [StarkLanguageSelectorComponent]
})
export class StarkLanguageSelectorModule {}
