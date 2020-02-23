import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExampleComponent } from './dialog-example.component';

describe('DialogExampleComponent', () => {
  let component: DialogExampleComponent;
  let fixture: ComponentFixture<DialogExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
