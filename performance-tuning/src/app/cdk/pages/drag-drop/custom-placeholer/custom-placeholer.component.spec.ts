import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPlaceholerComponent } from './custom-placeholer.component';

describe('CustomPlaceholerComponent', () => {
  let component: CustomPlaceholerComponent;
  let fixture: ComponentFixture<CustomPlaceholerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPlaceholerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPlaceholerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
