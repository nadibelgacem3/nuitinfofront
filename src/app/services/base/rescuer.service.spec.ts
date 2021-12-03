import { TestBed } from '@angular/core/testing';

import { RescuerService } from './rescuer.service';

describe('RescuerService', () => {
  let service: RescuerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RescuerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
