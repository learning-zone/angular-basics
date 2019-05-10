import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventBindingComponent } from './event-binding.component';

describe('EventBindingComponent', () => {
  let component: EventBindingComponent;
  let fixture: ComponentFixture<EventBindingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventBindingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventBindingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
