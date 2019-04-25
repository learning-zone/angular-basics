import { NgModule } from "@angular/core";
import { StarkCollapsibleComponent } from "./components";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	declarations: [StarkCollapsibleComponent],
	imports: [CommonModule, MatExpansionModule, MatIconModule, TranslateModule],
	exports: [StarkCollapsibleComponent]
})
export class StarkCollapsibleModule {}
