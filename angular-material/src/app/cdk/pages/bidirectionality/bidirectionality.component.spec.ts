import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidirectionalityComponent } from './bidirectionality.component';

describe('BidirectionalityComponent', () => {
  let component: BidirectionalityComponent;
  let fixture: ComponentFixture<BidirectionalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidirectionalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidirectionalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
