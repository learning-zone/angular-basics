import { TestBed, inject } from '@angular/core/testing';

import { QuestionsService } from './questions.service';

describe('QuestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionsService]
    });
  });

  it('should be created', inject([QuestionsService], (service: QuestionsService) => {
    expect(service).toBeTruthy();
  }));
});
