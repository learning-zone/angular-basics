import { TestBed, inject } from '@angular/core/testing';

import { ConfigurationService } from './configuration.service';
import { HttpModule } from "@angular/http";

describe('ConfigurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigurationService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([ConfigurationService], (service: ConfigurationService) => {
    expect(service).toBeTruthy();
  }));
});
