import { TestBed, async, inject } from '@angular/core/testing';

import { TeacherGuard } from './teacher.guard';

describe('TeacherGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeacherGuard]
    });
  });

  it('should ...', inject([TeacherGuard], (guard: TeacherGuard) => {
    expect(guard).toBeTruthy();
  }));
});
