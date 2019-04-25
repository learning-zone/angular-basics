import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoShowExtComponent } from './user-info-show-ext.component';

describe('UserInfoShowExtComponent', () => {
  let component: UserInfoShowExtComponent;
  let fixture: ComponentFixture<UserInfoShowExtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInfoShowExtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoShowExtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
