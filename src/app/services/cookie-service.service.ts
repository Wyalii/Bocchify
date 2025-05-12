import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieServiceService {
  constructor(private cookieService: CookieService) {}
  getToken() {
    return this.cookieService.get('token');
  }
  setToken(token: string): void {
    this.cookieService.set('token', token, 1, '/');
  }
  deleteToken(): void {
    this.cookieService.delete('token', '/');
  }
  isTokenExpired(): boolean {
    const token = this.getToken();
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() > exp;
    } catch (e) {
      return true;
    }
  }
}
