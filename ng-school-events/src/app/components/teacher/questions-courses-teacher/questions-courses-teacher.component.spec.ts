import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsCoursesTeacherComponent } from './questions-courses-teacher.component';

describe('QuestionsCoursesTeacherComponent', () => {
  let component: QuestionsCoursesTeacherComponent;
  let fixture: ComponentFixture<QuestionsCoursesTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsCoursesTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsCoursesTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
