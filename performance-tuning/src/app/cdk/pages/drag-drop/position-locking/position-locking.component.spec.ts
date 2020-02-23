import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionLockingComponent } from './position-locking.component';

describe('PositionLockingComponent', () => {
  let component: PositionLockingComponent;
  let fixture: ComponentFixture<PositionLockingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionLockingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionLockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
