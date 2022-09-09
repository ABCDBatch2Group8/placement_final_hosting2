import { TestBed } from '@angular/core/testing';

import { AdmnAuthGuard } from './admn-auth.guard';

describe('AdmnAuthGuard', () => {
  let guard: AdmnAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdmnAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
