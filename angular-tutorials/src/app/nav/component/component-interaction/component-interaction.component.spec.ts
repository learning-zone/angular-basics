import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentInteractionComponent } from './component-interaction.component';

describe('ComponentInteractionComponent', () => {
  let component: ComponentInteractionComponent;
  let fixture: ComponentFixture<ComponentInteractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentInteractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentInteractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
