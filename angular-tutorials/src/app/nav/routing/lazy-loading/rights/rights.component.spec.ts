import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightsComponent } from './rights.component';

describe('RightsComponent', () => {
  let component: RightsComponent;
  let fixture: ComponentFixture<RightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
