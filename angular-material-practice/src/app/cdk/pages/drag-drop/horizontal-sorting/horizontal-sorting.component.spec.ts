import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalSortingComponent } from './horizontal-sorting.component';

describe('HorizontalSortingComponent', () => {
  let component: HorizontalSortingComponent;
  let fixture: ComponentFixture<HorizontalSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorizontalSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
