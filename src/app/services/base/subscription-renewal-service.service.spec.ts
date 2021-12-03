import { TestBed } from '@angular/core/testing';

import { SubscriptionRenewalServiceService } from './subscription-renewal-service.service';

describe('SubscriptionRenewalServiceService', () => {
  let service: SubscriptionRenewalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionRenewalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
