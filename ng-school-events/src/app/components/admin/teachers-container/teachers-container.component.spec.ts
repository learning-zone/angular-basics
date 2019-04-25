import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersContainerComponent } from './teachers-container.component';

describe('TeachersContainerComponent', () => {
  let component: TeachersContainerComponent;
  let fixture: ComponentFixture<TeachersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
