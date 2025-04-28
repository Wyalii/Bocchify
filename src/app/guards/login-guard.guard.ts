import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieServiceService } from '../services/cookie-service.service';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieServiceService);
  let token = cookieService.getToken();
  if (token) {
    return false;
  }
  return true;
};
