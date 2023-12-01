import { TestBed } from '@angular/core/testing';

import { BnTagsService } from './bn-tags.service';

describe('BnTagsService', () => {
  let service: BnTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BnTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
