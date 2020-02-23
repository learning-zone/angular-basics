import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectedSortingComponent } from './connected-sorting.component';

describe('ConnectedSortingComponent', () => {
  let component: ConnectedSortingComponent;
  let fixture: ComponentFixture<ConnectedSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedSortingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectedSortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
