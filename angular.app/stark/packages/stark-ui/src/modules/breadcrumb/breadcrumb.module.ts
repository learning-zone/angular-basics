import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StarkBreadcrumbComponent } from "./components";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
	declarations: [StarkBreadcrumbComponent],
	imports: [CommonModule, TranslateModule],
	exports: [StarkBreadcrumbComponent]
})
export class StarkBreadcrumbModule {}
