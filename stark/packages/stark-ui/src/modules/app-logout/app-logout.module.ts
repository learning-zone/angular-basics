import { NgModule } from "@angular/core";
import { StarkAppLogoutComponent } from "./components";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";
import { StarkSvgViewBoxModule } from "../svg-view-box/svg-view-box.module";

@NgModule({
	declarations: [StarkAppLogoutComponent],
	exports: [StarkAppLogoutComponent],
	imports: [MatIconModule, StarkSvgViewBoxModule, TranslateModule, MatTooltipModule, MatButtonModule]
})
export class StarkAppLogoutModule {}
