import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactScrollerComponent } from './fact-scroller.component';

describe('FactScrollerComponent', () => {
  let component: FactScrollerComponent;
  let fixture: ComponentFixture<FactScrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactScrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactScrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
