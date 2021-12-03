import { TestBed } from '@angular/core/testing';

import { ImageItemsService } from './image-items.service';

describe('ImageItemsService', () => {
  let service: ImageItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
