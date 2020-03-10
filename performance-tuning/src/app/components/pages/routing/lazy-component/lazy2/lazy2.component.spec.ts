import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Lazy2Component } from './lazy2.component';

describe('Lazy2Component', () => {
  let component: Lazy2Component;
  let fixture: ComponentFixture<Lazy2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Lazy2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Lazy2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
