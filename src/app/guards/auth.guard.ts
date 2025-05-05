import { CanActivateFn } from '@angular/router';
import { CookieServiceService } from '../services/cookie-service.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieServiceService);
  const token = cookieService.getToken();
  const isTokenExpired = cookieService.isTokenExpired();
  if (!token || isTokenExpired) {
    return false;
  }
  return true;
};
