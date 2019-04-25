import {
	ActionBarComponent,
	ButtonComponent,
	DatePickerComponent,
	DateRangePickerComponent,
	DemoBreadcrumbComponent,
	DemoCardComponent,
	DemoColorsComponent,
	DemoCollapsibleComponent,
	DemoSidebarComponent,
	DemoDropdownComponent,
	ExampleViewerComponent,
	DemoFooterComponent,
	HeaderComponent,
	KeyboardDirectivesComponent,
	DemoLanguageSelectorComponent,
	LogoutComponent,
	DemoPaginationComponent,
	DemoPrettyPrintComponent,
	SliderComponent,
	DemoTableComponent,
	DemoToastComponent,
	DemoTypographyComponent
} from "./demo";
import { HomeComponent } from "./home";
import { NoContentComponent } from "./no-content";
import { Ng2StateDeclaration } from "@uirouter/angular";
import { NewsComponent } from "./news";

export const APP_STATES: Ng2StateDeclaration[] = [
	{ name: "news", url: "/news", component: NewsComponent },
	{ name: "home", url: "/", component: HomeComponent },
	{ name: "demo-action-bar", url: "/demo/action-bar", component: ActionBarComponent },
	{ name: "demo-breadcrumb", url: "/demo/breadcrumb", component: DemoBreadcrumbComponent },
	{ name: "demo-button", url: "/demo/button", component: ButtonComponent },
	{ name: "demo-card", url: "/demo/card", component: DemoCardComponent },
	{ name: "demo-collapsible", url: "/demo/collapsible", component: DemoCollapsibleComponent },
	{ name: "demo-colors", url: "/demo/colors", component: DemoColorsComponent },
	{ name: "demo-date-picker", url: "/demo/date-picker", component: DatePickerComponent },
	{ name: "demo-date-range-picker", url: "/demo/date-range-picker", component: DateRangePickerComponent },
	{ name: "demo-dropdown", url: "/demo/dropdown", component: DemoDropdownComponent },
	{ name: "demo-stark-footer", url: "/demo/stark-footer", component: DemoFooterComponent },
	{ name: "stark-header", url: "/demo/stark-header", component: HeaderComponent },
	{ name: "demo-example-viewer", url: "/demo/example-viewer", component: ExampleViewerComponent },
	{ name: "demo-keyboard-directives", url: "/demo/keyboard-directives", component: KeyboardDirectivesComponent },
	{ name: "demo-language-selector", url: "/demo/language-selector", component: DemoLanguageSelectorComponent },
	{ name: "demo-logout", url: "/demo/logout", component: LogoutComponent },
	{ name: "demo-pagination", url: "/demo/pagination", component: DemoPaginationComponent },
	{ name: "demo-pretty-print", url: "/demo/pretty-print", component: DemoPrettyPrintComponent },
	{ name: "demo-slider", url: "/demo/slider", component: SliderComponent },
	{ name: "demo-sidebar", url: "/demo/sidebar", component: DemoSidebarComponent },
	{ name: "demo-table", url: "/demo/table", component: DemoTableComponent },
	{ name: "demo-toast", url: "/demo/toast", component: DemoToastComponent },
	{ name: "demo-typography", url: "/demo/typography", component: DemoTypographyComponent },
	{ name: "otherwise", url: "/otherwise", component: NoContentComponent }
];
