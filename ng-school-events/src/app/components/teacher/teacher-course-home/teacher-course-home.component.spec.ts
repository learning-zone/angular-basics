import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCourseHomeComponent } from './teacher-course-home.component';

describe('TeacherCourseHomeComponent', () => {
  let component: TeacherCourseHomeComponent;
  let fixture: ComponentFixture<TeacherCourseHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCourseHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCourseHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
