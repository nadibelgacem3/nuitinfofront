import { TestBed } from '@angular/core/testing';

import { CompanyLocationService } from './company-location.service';

describe('CompanyLocationService', () => {
  let service: CompanyLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
