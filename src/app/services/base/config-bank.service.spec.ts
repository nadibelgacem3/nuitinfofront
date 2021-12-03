import { TestBed } from '@angular/core/testing';

import { ConfigBankService } from './config-bank.service';

describe('ConfigBankService', () => {
  let service: ConfigBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
