import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentManagementComponent } from './student-management.component';

describe('StudentManagementComponent', () => {
  let component: StudentManagementComponent;
  let fixture: ComponentFixture<StudentManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
