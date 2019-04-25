import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonsContainerComponent } from './sons-container.component';

describe('SonsContainerComponent', () => {
  let component: SonsContainerComponent;
  let fixture: ComponentFixture<SonsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
