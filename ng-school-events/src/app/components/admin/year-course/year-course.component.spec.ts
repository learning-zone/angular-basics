import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearCourseComponent } from './year-course.component';

describe('YearCourseComponent', () => {
  let component: YearCourseComponent;
  let fixture: ComponentFixture<YearCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
