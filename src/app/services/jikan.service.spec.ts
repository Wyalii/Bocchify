import { TestBed } from '@angular/core/testing';

import { JikanService } from './jikan.service';

describe('AnimeService', () => {
  let service: JikanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JikanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
