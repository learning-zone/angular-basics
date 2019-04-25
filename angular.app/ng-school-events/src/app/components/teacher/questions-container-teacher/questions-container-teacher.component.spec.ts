import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsContainerTeacherComponent } from './questions-container-teacher.component';

describe('QuestionsContainerTeacherComponent', () => {
  let component: QuestionsContainerTeacherComponent;
  let fixture: ComponentFixture<QuestionsContainerTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsContainerTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsContainerTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
