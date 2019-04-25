import { NgModule } from "@angular/core";
import { NewsComponent } from "./news-component";
import { NewsItemComponent } from "./news-item-component";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";

@NgModule({
	imports: [MatCardModule, MatIconModule, CommonModule],
	declarations: [NewsComponent, NewsItemComponent],
	exports: [NewsComponent, NewsItemComponent]
})
export class NewsModule {}
