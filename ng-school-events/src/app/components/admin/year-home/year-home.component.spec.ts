import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearHomeComponent } from './year-home.component';

describe('YearHomeComponent', () => {
  let component: YearHomeComponent;
  let fixture: ComponentFixture<YearHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
