import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherProfileComponent } from './teacher-profile.component';

describe('TeacherProfileComponent', () => {
  let component: TeacherProfileComponent;
  let fixture: ComponentFixture<TeacherProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
