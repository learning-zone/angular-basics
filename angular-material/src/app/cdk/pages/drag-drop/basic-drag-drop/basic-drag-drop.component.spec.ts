import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicDragDropComponent } from './basic-drag-drop.component';

describe('BasicDragDropComponent', () => {
  let component: BasicDragDropComponent;
  let fixture: ComponentFixture<BasicDragDropComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDragDropComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDragDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
