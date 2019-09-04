import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

//import { environment } from '@env/environment';
import { MAT_DATE_LOCALE } from '@angular/material';
import { AngularMaterialModule } from '../shared/angular-material.module';

@NgModule({
  
  imports: [
    CommonModule,
    HttpClient,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    AngularMaterialModule    
  ],
  declarations: [],
  providers: [],
  exports: []
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) { }
}