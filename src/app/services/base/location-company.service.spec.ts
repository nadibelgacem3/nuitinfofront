import { TestBed } from '@angular/core/testing';

import { LocationCompanyService } from './location-company.service';

describe('LocationCompanyService', () => {
  let service: LocationCompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationCompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
