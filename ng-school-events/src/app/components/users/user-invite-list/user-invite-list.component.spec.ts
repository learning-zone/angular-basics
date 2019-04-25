import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInviteListComponent } from './user-invite-list.component';

describe('UserInviteListComponent', () => {
  let component: UserInviteListComponent;
  let fixture: ComponentFixture<UserInviteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInviteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInviteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
