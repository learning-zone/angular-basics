import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarWidgetTwoComponent } from './sidebar-widget-two.component';

describe('SidebarWidgetTwoComponent', () => {
  let component: SidebarWidgetTwoComponent;
  let fixture: ComponentFixture<SidebarWidgetTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarWidgetTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarWidgetTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
