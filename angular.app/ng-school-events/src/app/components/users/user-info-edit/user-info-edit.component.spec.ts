import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoEditComponent } from './user-info-edit.component';

describe('UserInfoEditComponent', () => {
  let component: UserInfoEditComponent;
  let fixture: ComponentFixture<UserInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
