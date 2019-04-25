import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent when tested directly', () => {
  let comp: CarouselComponent;
  let expectedHeight: number;
  let fixture: ComponentFixture<CarouselComponent>;
  let carouselDe: DebugElement;
  let carouselEl: HTMLElement;

  let carouselItemDe: DebugElement[];
  let carouselItemEl: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselComponent ]
    })
    .compileComponents();
  }));
    
  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    comp    = fixture.componentInstance;

    // find the carousel's DebugElement and element
    carouselDe  = fixture.debugElement.query(By.css('.slide'));
    carouselEl  = carouselDe.nativeElement;

    // mock the carousel supplied by the parent component
    expectedHeight = 50;

    // simulate the parent setting the input property with that carousel
    comp.sliderHeight = expectedHeight;

    // trigger initial data binding
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      // after something in the component changes, you should detect changes
      fixture.detectChanges();
  
      // everything else in the beforeEach needs to be done here.
      carouselItemDe = fixture.debugElement.queryAll(By.css('div.test'));
      console.log("test", carouselItemDe);
      //carouselItemEl = carouselItemDe.nativeElement;
    })
  });
  
  it('should have carousel height set to passed input value', () => {
    expect(parseInt(<any>carouselEl.style.height)).toEqual(50);
  });

  // xit('should have carousel item height set to passed input value', () => {
  //   expect(parseInt(<any>carouselItemEl.style.height)).toEqual(50);
  // });

});

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
