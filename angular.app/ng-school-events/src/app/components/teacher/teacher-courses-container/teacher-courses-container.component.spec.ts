import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCoursesContainerComponent } from './teacher-courses-container.component';

describe('TeacherCoursesContainerComponent', () => {
  let component: TeacherCoursesContainerComponent;
  let fixture: ComponentFixture<TeacherCoursesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherCoursesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCoursesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
