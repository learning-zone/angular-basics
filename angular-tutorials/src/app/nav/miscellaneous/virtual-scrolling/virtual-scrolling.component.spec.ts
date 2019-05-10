import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualScrollingComponent } from './virtual-scrolling.component';

describe('VirtualScrollingComponent', () => {
  let component: VirtualScrollingComponent;
  let fixture: ComponentFixture<VirtualScrollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualScrollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualScrollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
