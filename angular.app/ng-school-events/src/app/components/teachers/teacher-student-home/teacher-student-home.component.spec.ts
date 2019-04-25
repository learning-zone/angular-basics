import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherStudentHomeComponent } from './teacher-student-home.component';

describe('TeacherStudentHomeComponent', () => {
  let component: TeacherStudentHomeComponent;
  let fixture: ComponentFixture<TeacherStudentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherStudentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherStudentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
