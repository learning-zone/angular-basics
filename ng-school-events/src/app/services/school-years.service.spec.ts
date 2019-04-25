import { TestBed, inject } from '@angular/core/testing';

import { SchoolYearsService } from './school-years.service';

describe('SchoolYearsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SchoolYearsService]
    });
  });

  it('should be created', inject([SchoolYearsService], (service: SchoolYearsService) => {
    expect(service).toBeTruthy();
  }));
});
