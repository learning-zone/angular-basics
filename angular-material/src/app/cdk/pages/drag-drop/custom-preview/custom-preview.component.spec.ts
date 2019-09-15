import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPreviewComponent } from './custom-preview.component';

describe('CustomPreviewComponent', () => {
  let component: CustomPreviewComponent;
  let fixture: ComponentFixture<CustomPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
