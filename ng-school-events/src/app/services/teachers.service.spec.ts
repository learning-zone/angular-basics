import { TestBed, inject } from '@angular/core/testing';

import { TeachersService } from './teachers.service';
import { ConfigurationService } from './configuration.service';
import { HttpModule } from "@angular/http";

describe('TeachersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeachersService, ConfigurationService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([TeachersService], (service: TeachersService) => {
    expect(service).toBeTruthy();
  }));
});
