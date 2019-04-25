import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentParentsComponent } from './student-parents.component';

describe('StudentParentsComponent', () => {
  let component: StudentParentsComponent;
  let fixture: ComponentFixture<StudentParentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentParentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
