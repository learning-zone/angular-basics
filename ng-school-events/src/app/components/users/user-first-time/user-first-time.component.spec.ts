import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFirstTimeComponent } from './user-first-time.component';

describe('UserFirstTimeComponent', () => {
  let component: UserFirstTimeComponent;
  let fixture: ComponentFixture<UserFirstTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFirstTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFirstTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
