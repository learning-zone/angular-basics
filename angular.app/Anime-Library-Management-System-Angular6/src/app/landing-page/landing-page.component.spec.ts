import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LandingPageComponent } from './landing-page.component';
import { NaturalType } from './../shared/pipes/natural-type.pipe';
import { Villain } from '../shared/interfaces/villain';

@Component({selector: 'app-carousel', template: ''})
class CarouselStubComponent {}

describe('LandingPageComponent (class only)', () => {
  let comp: LandingPageComponent;
  let dummyVillainArray: Array<Villain> = [{ image: '', alt: '', description: '' }];
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ LandingPageComponent ]               // injected component in configuration here
    });  
    comp = TestBed.get(LandingPageComponent); 
  });

  it('should not have all villains after construction', () => {
    expect(comp.allVillains).toBeUndefined();
  });

  it('should not have anime villains after construction', () => {
    expect(comp.animeVillains).toBeUndefined();
  });

  it('should not have carousel images after construction', () => {
    expect(comp.carouselImages).toBeUndefined();
  });

  it('should not have flip property on villain after construction', () => {
    comp.animeVillains = dummyVillainArray;
    expect(comp.animeVillains['flip']).toBeUndefined();
  });

  it('should get 8 anime villains after Angular calls ngOnInit', () => {
    comp.ngOnInit();
    expect(comp.allVillains.length).toBe(8);
  });

  it('should get 4 anime villains after Angular calls ngOnInit', () => {
    comp.ngOnInit();
    expect(comp.animeVillains.length).toBe(4);
  });

  it('should get 4 carousel images after Angular calls ngOnInit', () => {
    comp.ngOnInit();
    expect(comp.carouselImages.length).toBe(4);
  });

  it('should set villains flip property to inactive after Angular calls ngOnInit', () => {
    comp.animeVillains = dummyVillainArray;
    comp.ngOnInit();
    expect(comp.animeVillains[0]['flip']).toBe("inactive");
  });

});  

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let dummyVillain: Villain = { image: '', alt: '', description: '' };
  let dummyVillainArray: Array<Villain> = [{ image: '', alt: '', description: '' }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule ],
      declarations: [ LandingPageComponent, NaturalType, CarouselStubComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have search label as 'Search Anime Manga And Videos'`, () => {
    expect(component.searchTitle).toEqual(`Search Anime Manga And Videos`);
  });

  it(`should have villain section title as 'Popular Anime Villains'`, () => {
    expect(component.animeVillainsTitle).toEqual(`Popular Anime Villains`);
  });

  it(`should have carousel input height set as 500`, () => {
    expect(component.carouselHeight).toEqual(500);
  });

  it(`should set flip property to inactive on calling setFlip`, () => {
    component.animeVillains = dummyVillainArray;
    component.setFlip(component.animeVillains);
    expect(component.animeVillains[0]['flip']).toEqual("inactive");
  });
  
  it(`toggle flip should toggle anime flipping`, () => {
    expect(dummyVillain['flip']).toBeUndefined('Property does not exist on object');
    dummyVillain['flip'] = 'inactive';
    component.toggleFlip(dummyVillain);
    expect(dummyVillain['flip']).toBe('active', 'set active on mouseover');
    component.toggleFlip(dummyVillain);
    expect(dummyVillain['flip']).toBe('inactive', 'set inactive on mouseout'); 
  });

  it(`should slice data as per direction given`, () => {
    component.animeVillains = [];
    component.sliceData('backward');
    expect(component.animeVillains.length).toEqual(4);
    component.sliceData('forward');
    expect(component.animeVillains.length).toEqual(4);
  });

});
