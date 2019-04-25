import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

// components
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { TableComponent } from './table/table.component';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  imports: [ CommonModule, AppRoutingModule ],
  exports: [ HeaderComponent, FooterComponent, SpinnerComponent, TableComponent, CarouselComponent ],
  declarations: [ HeaderComponent, FooterComponent, SpinnerComponent, TableComponent, CarouselComponent ]
})
export class SharedModule { }
