import { CanActivateFn } from '@angular/router';
import { CookieServiceService } from '../services/cookie-service.service';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieServiceService);
  let token = cookieService.getToken();
  if (!token) {
    return false;
  }
  return true;
};
