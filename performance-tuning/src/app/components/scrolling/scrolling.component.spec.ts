import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollingComponent } from './scrolling.component';

describe('ScrollingComponent', () => {
  let component: ScrollingComponent;
  let fixture: ComponentFixture<ScrollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
