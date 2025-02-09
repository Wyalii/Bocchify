import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private cookieService = inject(CookieService);
  private decodedTokenSubject = new BehaviorSubject<any>(null);
  decodedToken$ = this.decodedTokenSubject.asObservable();

  decodeUserToken() {
    const token = this.cookieService.get('token');
    if (token) {
      try {
        const decodedUserToken = jwtDecode(token);
        this.decodedTokenSubject.next(decodedUserToken);
      } catch (error) {
        console.log(error);
      }
    }
  }
  constructor() {}
}
