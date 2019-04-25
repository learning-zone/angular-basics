import { TestBed, async, inject } from '@angular/core/testing';

import { ParentGuard } from './parent.guard';

describe('ParentGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParentGuard]
    });
  });

  it('should ...', inject([ParentGuard], (guard: ParentGuard) => {
    expect(guard).toBeTruthy();
  }));
});
