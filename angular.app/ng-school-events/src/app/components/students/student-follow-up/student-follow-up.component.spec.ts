import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFollowUpComponent } from './student-follow-up.component';

describe('StudentFollowUpComponent', () => {
  let component: StudentFollowUpComponent;
  let fixture: ComponentFixture<StudentFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
