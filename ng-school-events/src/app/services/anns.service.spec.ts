import { TestBed, inject } from '@angular/core/testing';

import { AnnsService } from './anns.service';

describe('AnnsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnsService]
    });
  });

  it('should be created', inject([AnnsService], (service: AnnsService) => {
    expect(service).toBeTruthy();
  }));
});
