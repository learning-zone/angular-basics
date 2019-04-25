import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAddAdminComponent } from './course-add-admin.component';

describe('CourseAddAdminComponent', () => {
  let component: CourseAddAdminComponent;
  let fixture: ComponentFixture<CourseAddAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAddAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
