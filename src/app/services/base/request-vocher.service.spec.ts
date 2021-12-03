import { TestBed } from '@angular/core/testing';

import { RequestVocherService } from './request-vocher.service';

describe('RequestVocherService', () => {
  let service: RequestVocherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestVocherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
