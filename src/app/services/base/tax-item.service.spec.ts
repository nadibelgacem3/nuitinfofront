import { TestBed } from '@angular/core/testing';

import { TaxItemService } from './tax-item.service';

describe('TaxItemService', () => {
  let service: TaxItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
