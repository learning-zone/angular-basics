import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsContainerComponent } from './parents-container.component';

describe('ParentsContainerComponent', () => {
  let component: ParentsContainerComponent;
  let fixture: ComponentFixture<ParentsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
