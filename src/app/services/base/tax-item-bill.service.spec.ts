import { TestBed } from '@angular/core/testing';

import { TaxItemBillService } from './tax-item-bill.service';

describe('TaxItemBillService', () => {
  let service: TaxItemBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxItemBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
