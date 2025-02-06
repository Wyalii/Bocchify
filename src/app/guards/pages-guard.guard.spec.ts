import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pagesGuardGuard } from './pages-guard.guard';

describe('pagesGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pagesGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
