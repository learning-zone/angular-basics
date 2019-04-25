import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearAddAdminComponent } from './year-add-admin.component';

describe('YearAddAdminComponent', () => {
  let component: YearAddAdminComponent;
  let fixture: ComponentFixture<YearAddAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearAddAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
