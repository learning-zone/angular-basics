import { TestBed } from '@angular/core/testing';

import { FactService } from './fact.service';

describe('FactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FactService = TestBed.get(FactService);
    expect(service).toBeTruthy();
  });
});
