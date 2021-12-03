import { TestBed } from '@angular/core/testing';

import { VariantConfigService } from './variant-config.service';

describe('VariantConfigService', () => {
  let service: VariantConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VariantConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
