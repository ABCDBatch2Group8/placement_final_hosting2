import { TestBed } from '@angular/core/testing';

import { EmpTokenInterceptorService } from './emp-token-interceptor.service';

describe('EmpTokenInterceptorService', () => {
  let service: EmpTokenInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpTokenInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
