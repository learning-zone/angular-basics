import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularFormsComponent } from './angular-forms.component';

describe('AngularFormsComponent', () => {
  let component: AngularFormsComponent;
  let fixture: ComponentFixture<AngularFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
