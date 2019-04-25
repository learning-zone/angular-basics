import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTooltipModule } from "@angular/material/tooltip";
import { TranslateModule } from "@ngx-translate/core";
import { StarkTableComponent, StarkTableColumnComponent } from "./components";
import { StarkTableMultisortDialogComponent } from "./components/dialogs/multisort.component";
import { StarkActionBarModule } from "../action-bar/action-bar.module";
import { StarkPaginationModule } from "../pagination/pagination.module";
import { StarkSvgViewBoxModule } from "../svg-view-box/svg-view-box.module";

@NgModule({
	declarations: [StarkTableComponent, StarkTableMultisortDialogComponent, StarkTableColumnComponent],
	entryComponents: [StarkTableMultisortDialogComponent],
	exports: [StarkTableComponent, StarkTableColumnComponent],
	imports: [
		BrowserAnimationsModule,
		FormsModule,
		MatButtonModule,
		MatCheckboxModule,
		MatDialogModule,
		MatIconModule,
		MatInputModule,
		MatMenuModule,
		MatSelectModule,
		MatSortModule,
		MatTableModule,
		MatTooltipModule,
		TranslateModule,
		StarkActionBarModule,
		StarkPaginationModule,
		StarkSvgViewBoxModule
	]
})
export class StarkTableModule {}
