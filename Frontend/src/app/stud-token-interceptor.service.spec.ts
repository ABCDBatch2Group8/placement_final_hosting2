import { TestBed } from '@angular/core/testing';

import { StudTokenInterceptorService } from './stud-token-interceptor.service';

describe('StudTokenInterceptorService', () => {
  let service: StudTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
