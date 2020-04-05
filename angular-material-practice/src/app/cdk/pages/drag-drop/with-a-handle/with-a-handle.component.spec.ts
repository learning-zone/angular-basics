import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithAHandleComponent } from './with-a-handle.component';

describe('WithAHandleComponent', () => {
  let component: WithAHandleComponent;
  let fixture: ComponentFixture<WithAHandleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithAHandleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithAHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
