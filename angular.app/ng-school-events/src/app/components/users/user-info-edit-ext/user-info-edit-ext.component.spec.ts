import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoEditExtComponent } from './user-info-edit-ext.component';

describe('UserInfoEditExtComponent', () => {
  let component: UserInfoEditExtComponent;
  let fixture: ComponentFixture<UserInfoEditExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoEditExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoEditExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
