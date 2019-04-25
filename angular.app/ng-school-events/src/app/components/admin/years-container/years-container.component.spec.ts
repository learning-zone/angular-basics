import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearsContainerComponent } from './years-container.component';

describe('YearsContainerComponent', () => {
  let component: YearsContainerComponent;
  let fixture: ComponentFixture<YearsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
