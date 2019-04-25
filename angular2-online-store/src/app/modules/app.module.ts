import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { reducer } from '../reducers';
import { appRoutes } from './app-routing.module';
import * as components from '../components';
import * as services from '../services';

@NgModule({
  declarations: [
    //app
    components.AppComponent,

    //pages
    components.AdminCreateComponent,
    components.AdminEditComponent,
    components.AdminPageComponent,
    components.AdminStoreComponent,
    components.StoreItemComponent,
    components.CatalogFiltersComponent,
    components.CatalogItemComponent,
    components.CatalogItemPreviewComponent,
    components.CatalogPageComponent,
    components.PageNotFoundComponent,
    components.HomePageComponent,
    components.ShoppingCartComponent,
    components.ShoppingCartItemComponent,

    //shared
    components.NavigationComponent,
    components.ComputerFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.provideStore(reducer),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [
    services.ApiService,
    services.NotificationService,
    services.ShoppingCartService,
    services.SubscriptionService
  ],
  bootstrap: [components.AppComponent]
})
export class AppModule { }
