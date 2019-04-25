import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentHomeComponent } from './parent-home.component';

describe('ParentHomeComponent', () => {
  let component: ParentHomeComponent;
  let fixture: ComponentFixture<ParentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
