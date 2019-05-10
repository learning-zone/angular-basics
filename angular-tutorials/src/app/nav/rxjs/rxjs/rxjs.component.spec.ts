import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsComponent } from './rxjs.component';

describe('RxjsComponent', () => {
  let component: RxjsComponent;
  let fixture: ComponentFixture<RxjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxjsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
