import { TestBed, inject } from '@angular/core/testing';

import { FollowUpsService } from './follow-ups.service';

describe('FollowUpsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FollowUpsService]
    });
  });

  it('should be created', inject([FollowUpsService], (service: FollowUpsService) => {
    expect(service).toBeTruthy();
  }));
});
