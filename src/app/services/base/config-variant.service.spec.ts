import { TestBed } from '@angular/core/testing';

import { ConfigVariantService } from './config-variant.service';

describe('ConfigVariantService', () => {
  let service: ConfigVariantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigVariantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
