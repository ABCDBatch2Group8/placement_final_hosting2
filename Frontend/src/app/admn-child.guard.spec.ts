import { TestBed } from '@angular/core/testing';

import { AdmnChildGuard } from './admn-child.guard';

describe('AdmnChildGuard', () => {
  let guard: AdmnChildGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdmnChildGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
