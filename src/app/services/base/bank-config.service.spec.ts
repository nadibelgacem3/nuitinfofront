import { TestBed } from '@angular/core/testing';

import { BankConfigService } from './bank-config.service';

describe('BankConfigService', () => {
  let service: BankConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
