import { TestBed } from '@angular/core/testing';

import { BillOperationConfigDocsService } from './bill-operation-config-docs.service';

describe('BillOperationConfigDocsService', () => {
  let service: BillOperationConfigDocsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillOperationConfigDocsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
