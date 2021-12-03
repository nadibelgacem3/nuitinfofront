import { TestBed } from '@angular/core/testing';

import { DemoSubscriptionService } from './demo-subscription.service';

// @ts-ignore
describe('DemoSubscriptionService', () => {
  let service: DemoSubscriptionService;

  // @ts-ignore
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoSubscriptionService);
  });

  // @ts-ignore
  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
