import { TestBed } from '@angular/core/testing';

import { ValueVariantService } from './value-variant.service';

describe('ValueVariantService', () => {
  let service: ValueVariantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValueVariantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
