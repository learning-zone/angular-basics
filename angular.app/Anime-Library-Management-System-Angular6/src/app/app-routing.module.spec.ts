import { AppRoutingModule } from './app-routing.module';

describe('AppRoutingModule', () => {
  let appRoutingModule: AppRoutingModule;

  beforeEach(() => {
    appRoutingModule = new AppRoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});

// Router Testing

import { async, ComponentFixture, fakeAsync, TestBed, tick, } from '@angular/core/testing';

import { RouterTestingModule }  from '@angular/router/testing';
import { SpyLocation }          from '@angular/common/testing';
import { Location }             from '@angular/common';

import { By }                 from '@angular/platform-browser';
import { DebugElement, Type }   from '@angular/core';
import { Router, RouterLinkWithHref } from '@angular/router';

import { click }              from '../testing';

import { AppModule }            from './app.module';
import { AppComponent }         from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AnimeListComponent }   from './anime-list/anime-list.component';
import { PopularAnimeComponent } from './popular-anime/popular-anime.component';
import { HeaderComponent } from './shared/header/header.component';

let comp:     AppComponent;
let fixture:  ComponentFixture<AppComponent>;
let page:     Page;
let router:   Router;
let location: SpyLocation;

describe('AppComponent & RouterTestingModule', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  it('should navigate to "Home" immediately', fakeAsync(() => {
    createComponent();
    tick(4000); // wait for async data to arrive
    expect(location.path()).toEqual('/home', 'after initialNavigation()');
    expectElementOf(LandingPageComponent);
  }));

  xit('should navigate to "Anime-List" on click', fakeAsync(() => {
    createComponent();
    click(page.animeList);
    // page.aboutLinkDe.nativeElement.click(); // ok but fails in phantom
     
    advance();
    tick(5000);
    expectPathToBe('/anime-list');
    expectElementOf(AnimeListComponent);
    
  }));

  xit('should navigate to "Anime-List" w/ browser location URL change', fakeAsync(() => {
    createComponent();
    location.simulateHashChange('/anime-list');
    // location.go('/anime-list'); // also works ... except, perhaps, in Stackblitz
    advance();
    expectPathToBe('/anime-list');
    expectElementOf(AnimeListComponent);
  }));

  xit('should navigate to "Popular Anime" on click', fakeAsync(() => {
    createComponent();
    click(page.popularAnime);
    // page.aboutLinkDe.nativeElement.click(); // ok but fails in phantom
     
    advance();
    tick(5000);
    expectPathToBe('/popular-anime');
    expectElementOf(PopularAnimeComponent);    
  }));

  xit('should navigate to "Popular Anime" w/ browser location URL change', fakeAsync(() => {
    createComponent();
    location.simulateHashChange('/popular-anime');
    advance();
    expectPathToBe('/popular-anime');
    expectElementOf(PopularAnimeComponent);
  }));

});

////// Helpers /////////

/**
 * Advance to the routed page
 * Wait a tick, then detect changes, and tick again
 */
function advance(): void {
  //tick(); // wait while navigating
  fixture.detectChanges(); // update view
  //tick(); // wait for async data to arrive
}

function createComponent() {
  fixture = TestBed.createComponent(AppComponent);
  comp = fixture.componentInstance;

  const injector = fixture.debugElement.injector;
  location = injector.get(Location) as SpyLocation;
  router = injector.get(Router);
  router.initialNavigation();
  advance();

  page = new Page();
}

class Page {
  animeList: DebugElement;
  popularAnime: DebugElement;

  // for debugging
  comp: HeaderComponent;
  location: SpyLocation;
  router: Router;
  fixture: ComponentFixture<HeaderComponent>;

  constructor() {
    this.fixture = TestBed.createComponent(HeaderComponent);
    const links = this.fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));
    this.animeList = links[0];
    this.popularAnime = links[1];

    // // for debugging
    // this.comp    = comp;
    // this.fixture = fixture;
    // this.router  = router;
  }
}

function expectPathToBe(path: string, expectationFailOutput?: any) {
  expect(location.path()).toEqual(path, expectationFailOutput || 'location.path()');
}

function expectElementOf(type: Type<any>): any {
  const el = fixture.debugElement.query(By.directive(type));
  expect(type).toBeTruthy('expected an element for ' + type.name);
  return el;
}
