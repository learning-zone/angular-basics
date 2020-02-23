import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarExampleComponent } from './snackbar-example.component';

describe('SnackbarExampleComponent', () => {
  let component: SnackbarExampleComponent;
  let fixture: ComponentFixture<SnackbarExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
