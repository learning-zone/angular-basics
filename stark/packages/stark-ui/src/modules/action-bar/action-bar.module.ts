import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule } from "@angular/material";
import { StarkSvgViewBoxModule } from "../svg-view-box/svg-view-box.module";
import { StarkActionBarComponent } from "./components";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	declarations: [StarkActionBarComponent],
	imports: [CommonModule, StarkSvgViewBoxModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule, TranslateModule],
	exports: [StarkActionBarComponent]
})
export class StarkActionBarModule {}
