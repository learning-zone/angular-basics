import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionListComponent } from './gestion-list.component';

describe('GestionListComponent', () => {
  let component: GestionListComponent;
  let fixture: ComponentFixture<GestionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
