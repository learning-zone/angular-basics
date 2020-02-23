import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoundaryComponent } from './boundary.component';

describe('BoundaryComponent', () => {
  let component: BoundaryComponent;
  let fixture: ComponentFixture<BoundaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoundaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoundaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
