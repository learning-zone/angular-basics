import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonListComponent } from './son-list.component';

describe('SonListComponent', () => {
  let component: SonListComponent;
  let fixture: ComponentFixture<SonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
