import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsCoursesComponent } from './questions-courses.component';

describe('QuestionsCoursesComponent', () => {
  let component: QuestionsCoursesComponent;
  let fixture: ComponentFixture<QuestionsCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
