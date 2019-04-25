import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwardComponent } from './forward.component';

describe('ForwardComponent', () => {
  let component: ForwardComponent;
  let fixture: ComponentFixture<ForwardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForwardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
