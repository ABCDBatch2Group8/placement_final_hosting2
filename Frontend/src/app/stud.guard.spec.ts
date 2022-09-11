import { TestBed } from '@angular/core/testing';

import { StudGuard } from './stud.guard';

describe('StudGuard', () => {
  let guard: StudGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(StudGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
