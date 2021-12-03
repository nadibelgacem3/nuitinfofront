import { TestBed } from '@angular/core/testing';

import { DeducteAtSourceService } from './deducte-at-source.service';

describe('DeducteAtSourceService', () => {
  let service: DeducteAtSourceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeducteAtSourceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
