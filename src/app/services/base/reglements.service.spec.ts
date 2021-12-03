import { TestBed } from '@angular/core/testing';

import { ReglementsService } from './reglements.service';

describe('ReglementsService', () => {
  let service: ReglementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReglementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
