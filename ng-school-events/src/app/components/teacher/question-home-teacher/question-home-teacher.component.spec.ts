import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionHomeTeacherComponent } from './question-home-teacher.component';

describe('QuestionHomeTeacherComponent', () => {
  let component: QuestionHomeTeacherComponent;
  let fixture: ComponentFixture<QuestionHomeTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionHomeTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionHomeTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
