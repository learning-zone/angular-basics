import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MAT_DATE_FORMATS } from "@angular/material/core";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TranslateModule } from "@ngx-translate/core";
import { ActionBarComponent } from "./action-bar/action-bar.component";
import { DemoBreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { DemoCardComponent } from "./card/demo-card.component";
import { DemoColorsComponent } from "./colors/demo-colors.component";
import { ButtonComponent } from "./button/button.component";
import { DatePickerComponent } from "./date-picker/date-picker.component";
import { DateRangePickerComponent } from "./date-range-picker/date-range-picker.component";
import { DemoCollapsibleComponent } from "./collapsible/demo-collapsible.component";
import { DemoSidebarComponent } from "./sidebar/demo-sidebar.component";
import { DemoDropdownComponent } from "./dropdown/demo-dropdown.component";
import { ExampleViewerComponent } from "./example-viewer/example-viewer.component";
import { HeaderComponent } from "./header/header.component";
import { DemoFooterComponent } from "./footer/demo-footer.component";
import { KeyboardDirectivesComponent } from "./keyboard-directives/keyboard-directives.component";
import { DemoLanguageSelectorComponent } from "./language-selector/demo-language-selector.component";
import { LogoutComponent } from "./logout/logout.component";
import { DemoPaginationComponent } from "./pagination/demo-pagination.component";
import { DemoPrettyPrintComponent } from "./pretty-print/demo-pretty-print.component";
import { SliderComponent } from "./slider/slider.component";
import { DemoTableComponent } from "./table/demo-table.component";
import { DemoTypographyComponent } from "./typography/demo-typography.component";
import { DemoToastComponent } from "./toast/demo-toast-notification.component";
import { SharedModule } from "../shared/shared.module";
import {
	STARK_DATE_FORMATS,
	StarkActionBarModule,
	StarkAppLogoutModule,
	StarkBreadcrumbModule,
	StarkDatePickerModule,
	StarkDateRangePickerModule,
	StarkDropdownModule,
	StarkKeyboardDirectivesModule,
	StarkLanguageSelectorModule,
	StarkPaginationModule,
	StarkPrettyPrintModule,
	StarkSliderModule,
	StarkSvgViewBoxModule,
	StarkTableModule,
	StarkCollapsibleModule
} from "@nationalbankbelgium/stark-ui";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatDividerModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatTooltipModule,
		MatSnackBarModule,
		MatTabsModule,
		TranslateModule,
		SharedModule,
		StarkActionBarModule,
		StarkBreadcrumbModule,
		StarkDropdownModule,
		StarkKeyboardDirectivesModule,
		StarkLanguageSelectorModule,
		StarkPaginationModule,
		StarkPrettyPrintModule,
		StarkDatePickerModule,
		StarkDateRangePickerModule,
		StarkSliderModule,
		StarkSvgViewBoxModule,
		StarkTableModule,
		StarkCollapsibleModule,
		StarkAppLogoutModule
	],
	declarations: [
		ActionBarComponent,
		DemoBreadcrumbComponent,
		ButtonComponent,
		DemoCollapsibleComponent,
		DatePickerComponent,
		DateRangePickerComponent,
		DemoCardComponent,
		DemoColorsComponent,
		DemoDropdownComponent,
		DemoTypographyComponent,
		ExampleViewerComponent,
		HeaderComponent,
		DemoFooterComponent,
		KeyboardDirectivesComponent,
		DemoLanguageSelectorComponent,
		LogoutComponent,
		DemoPaginationComponent,
		DemoPrettyPrintComponent,
		SliderComponent,
		DemoToastComponent,
		DatePickerComponent,
		DateRangePickerComponent,
		DemoSidebarComponent,
		ExampleViewerComponent,
		KeyboardDirectivesComponent,
		DemoTableComponent
	],
	exports: [
		ActionBarComponent,
		DemoBreadcrumbComponent,
		DemoCardComponent,
		DemoColorsComponent,
		ButtonComponent,
		DatePickerComponent,
		DateRangePickerComponent,
		DemoDropdownComponent,
		DemoCollapsibleComponent,
		DemoTypographyComponent,
		ExampleViewerComponent,
		HeaderComponent,
		DemoFooterComponent,
		KeyboardDirectivesComponent,
		DemoLanguageSelectorComponent,
		LogoutComponent,
		DemoPaginationComponent,
		DemoPrettyPrintComponent,
		SliderComponent,
		DemoTableComponent,
		DemoToastComponent
	],
	providers: [{ provide: MAT_DATE_FORMATS, useValue: STARK_DATE_FORMATS }]
})
export class DemoModule {}
