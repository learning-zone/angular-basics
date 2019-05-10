import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalizationComponent } from './internationalization.component';

describe('InternationalizationComponent', () => {
  let component: InternationalizationComponent;
  let fixture: ComponentFixture<InternationalizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
