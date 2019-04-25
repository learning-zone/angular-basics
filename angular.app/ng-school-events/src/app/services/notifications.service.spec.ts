import { TestBed, inject } from '@angular/core/testing';

import { BellNotificationsService } from './bell-notifications.service';

describe('NotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BellNotificationsService]
    });
  });

  it('should be created', inject([BellNotificationsService], (service: BellNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
