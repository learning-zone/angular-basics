// angular libraries 
// Angular loads as a collection of JavaScript modules. You can think of them as library modules. Each Angular library name begins with the @angular prefix.
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { ChangeDetectorRef, NgZone } from '@angular/core';

// created modules
import { SharedModule } from'./shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

// no need to import spinner service because of providedIn flag

// created components
import { AppComponent } from './app.component';
import { AnimeListComponent } from './anime-list/anime-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PopularAnimeComponent } from './popular-anime/popular-anime.component';
import { FavouriteAnimeComponent } from './favourite-anime/favourite-anime.component';

// redux store
import { AnimeAppState, rootReducer, INITIAL_STATE } from './shared/redux/store';

// created pipes
import { NaturalType } from './shared/pipes/natural-type.pipe';

//iziToast
import { Ng2IziToastModule } from 'ng2-izitoast';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    NgReduxModule,
    Ng2IziToastModule
  ],
  declarations: [
    AppComponent,
    AnimeListComponent,
    LandingPageComponent,
    PopularAnimeComponent,
    FavouriteAnimeComponent,
    NaturalType
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<AnimeAppState>) {
     ngRedux.configureStore(rootReducer, INITIAL_STATE);
  }
}
