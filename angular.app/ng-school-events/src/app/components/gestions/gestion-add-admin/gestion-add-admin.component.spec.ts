import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAddAdminComponent } from './gestion-add-admin.component';

describe('GestionAddAdminComponent', () => {
  let component: GestionAddAdminComponent;
  let fixture: ComponentFixture<GestionAddAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAddAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAddAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
