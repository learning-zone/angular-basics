import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservablesComponent } from './observables.component';

describe('ObservablesComponent', () => {
  let component: ObservablesComponent;
  let fixture: ComponentFixture<ObservablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
