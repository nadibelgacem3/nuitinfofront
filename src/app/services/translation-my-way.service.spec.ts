import { TestBed } from '@angular/core/testing';

import { TranslationMyWayService } from './translation-my-way.service';

describe('TranslationMyWayService', () => {
  let service: TranslationMyWayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationMyWayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
