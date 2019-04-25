import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionHomeComponent } from './question-home.component';

describe('QuestionHomeComponent', () => {
  let component: QuestionHomeComponent;
  let fixture: ComponentFixture<QuestionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
