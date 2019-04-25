import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatPaginatorModule } from "@angular/material/paginator";
import { StarkPaginationComponent } from "./components";
import { StarkSvgViewBoxModule } from "../svg-view-box/svg-view-box.module";
import { StarkKeyboardDirectivesModule } from "../keyboard-directives/keyboard-directives.module";
import { StarkDropdownModule } from "../dropdown/dropdown.module";

@NgModule({
	declarations: [StarkPaginationComponent],
	exports: [StarkPaginationComponent],
	imports: [
		BrowserAnimationsModule,
		FormsModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		MatTooltipModule,
		StarkKeyboardDirectivesModule,
		StarkSvgViewBoxModule,
		StarkDropdownModule
	]
})
export class StarkPaginationModule {}
