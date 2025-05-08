import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieServiceService } from '../services/cookie-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY } from 'rxjs';

export const tokenValidationInterceptorInterceptor: HttpInterceptorFn = (
  req,
  next
) => {
  const cookieService = inject(CookieServiceService);
  const toastr = inject(ToastrService);
  const isTokenExpired = cookieService.isTokenExpired();
  const token = cookieService.getToken();
  const router = inject(Router);
  if (token && isTokenExpired) {
    toastr.error('Token Expired.', 'Error');
    cookieService.deleteToken();
    router.navigate(['/login']);
    setTimeout(() => window.location.reload(), 1000);
    return EMPTY;
  }
  return next(req);
};
