import { TestBed } from '@angular/core/testing';

import { SauveesService } from './sauvees.service';

describe('SauveesService', () => {
  let service: SauveesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SauveesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
