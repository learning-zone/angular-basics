import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseYearComponent } from './course-year.component';

describe('CourseYearComponent', () => {
  let component: CourseYearComponent;
  let fixture: ComponentFixture<CourseYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
