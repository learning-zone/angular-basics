import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterPredicateComponent } from './enter-predicate.component';

describe('EnterPredicateComponent', () => {
  let component: EnterPredicateComponent;
  let fixture: ComponentFixture<EnterPredicateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterPredicateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterPredicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
