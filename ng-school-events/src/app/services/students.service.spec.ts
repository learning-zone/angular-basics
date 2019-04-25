import { TestBed, inject } from '@angular/core/testing';

import { StudentsService } from './students.service';
import { ConfigurationService } from './configuration.service';
import { HttpModule } from "@angular/http";

describe('StudentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentsService, ConfigurationService],
      imports: [HttpModule]
    });
  });

  it('should be created', inject([StudentsService], (service: StudentsService) => {
    expect(service).toBeTruthy();
  }));
});
