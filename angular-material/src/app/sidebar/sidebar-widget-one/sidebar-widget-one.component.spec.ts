import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarWidgetOneComponent } from './sidebar-widget-one.component';

describe('SidebarWidgetOneComponent', () => {
  let component: SidebarWidgetOneComponent;
  let fixture: ComponentFixture<SidebarWidgetOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarWidgetOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarWidgetOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
