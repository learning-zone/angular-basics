import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithAlternateRootElementComponent } from './with-alternate-root-element.component';

describe('WithAlternateRootElementComponent', () => {
  let component: WithAlternateRootElementComponent;
  let fixture: ComponentFixture<WithAlternateRootElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithAlternateRootElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithAlternateRootElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
