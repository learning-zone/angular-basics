import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarWidgetThreeComponent } from './sidebar-widget-three.component';

describe('SidebarWidgetThreeComponent', () => {
  let component: SidebarWidgetThreeComponent;
  let fixture: ComponentFixture<SidebarWidgetThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarWidgetThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarWidgetThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
