import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentRegisterComponent } from './parent-register.component';

describe('ParentRegisterComponent', () => {
  let component: ParentRegisterComponent;
  let fixture: ComponentFixture<ParentRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
