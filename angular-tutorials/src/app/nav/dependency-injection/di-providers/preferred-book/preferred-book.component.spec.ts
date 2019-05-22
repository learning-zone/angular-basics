import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredBookComponent } from './preferred-book.component';

describe('PreferredBookComponent', () => {
  let component: PreferredBookComponent;
  let fixture: ComponentFixture<PreferredBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreferredBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
