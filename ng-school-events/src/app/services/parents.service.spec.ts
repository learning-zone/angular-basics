import { TestBed, inject } from '@angular/core/testing';

import { ParentsService } from './parents.service';

describe('ParentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentsService]
    });
  });

  it('should be created', inject([ParentsService], (service: ParentsService) => {
    expect(service).toBeTruthy();
  }));
});
