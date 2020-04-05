import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackbyComponent } from './trackby.component';

describe('TrackbyComponent', () => {
  let component: TrackbyComponent;
  let fixture: ComponentFixture<TrackbyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackbyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
