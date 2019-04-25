import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SliderComponent } from './slider/slider.component';
import { FrontComponent } from './front/front.component';
import { AboutComponent } from './about/about.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { ImagesComponent } from './images/images.component';
import { ForwardComponent } from './forward/forward.component';



@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    FrontComponent,
    AboutComponent,
    AdvertisementComponent,
    ImagesComponent,
    ForwardComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
