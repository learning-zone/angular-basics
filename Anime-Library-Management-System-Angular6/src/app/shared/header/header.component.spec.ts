import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { NgReduxTestingModule, MockNgRedux } from '@angular-redux/store/testing';
import { NgRedux } from '@angular-redux/store';

import { HeaderComponent } from './header.component';
import { RouterLinkDirectiveStub } from '../../../testing/router-link-directive-stub';
import { AnimeAppState } from '../redux/store';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];

  let mockNgRedux: NgRedux<AnimeAppState>; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent, RouterLinkDirectiveStub ],
      imports: [ NgReduxTestingModule ]
    })
    .compileComponents();
    MockNgRedux.reset();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockNgRedux = MockNgRedux.getInstance();
    const animes = MockNgRedux.getSelectorStub('animes');
    animes.next([]);
    animes.complete();

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('can get RouterLinks from template', () => {
    expect(routerLinks.length).toBe(2, 'should have 2 routerLinks');
    expect(routerLinks[0].linkParams).toBe('/anime-list');
    expect(routerLinks[1].linkParams).toBe('/popular-anime');
  });
});
