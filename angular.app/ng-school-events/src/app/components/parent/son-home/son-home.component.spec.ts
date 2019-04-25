import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonHomeComponent } from './son-home.component';

describe('SonHomeComponent', () => {
  let component: SonHomeComponent;
  let fixture: ComponentFixture<SonHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
