import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnListAdminComponent } from './ann-list-admin.component';

describe('AnnListAdminComponent', () => {
  let component: AnnListAdminComponent;
  let fixture: ComponentFixture<AnnListAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnListAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
