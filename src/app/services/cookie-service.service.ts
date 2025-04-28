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
    this.cookieService.delete('token');
  }
}
