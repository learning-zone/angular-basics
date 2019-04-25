import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearListAdminComponent } from './year-list-admin.component';

describe('YearListAdminComponent', () => {
  let component: YearListAdminComponent;
  let fixture: ComponentFixture<YearListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
