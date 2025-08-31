import { TestBed } from '@angular/core/testing';

import { BocchifyApiService } from './bocchify-api-service';

describe('BocchifyApiService', () => {
  let service: BocchifyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BocchifyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
