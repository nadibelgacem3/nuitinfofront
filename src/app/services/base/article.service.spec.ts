import { TestBed } from '@angular/core/testing';

import { ArticleService } from './article.service';

// @ts-ignore
describe('ArticleService', () => {
  let service: ArticleService;

  // @ts-ignore
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleService);
  });

  // @ts-ignore
  it('should be created', () => {
    // @ts-ignore
    expect(service).toBeTruthy();
  });
});
