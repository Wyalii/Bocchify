import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieServiceService } from './cookie-service.service';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private cookieService: CookieServiceService,
    private backendService: BackendService
  ) {}
  private usernameKey = 'username';
  private profileImageKey = 'profileImage';
  private emailSubject = new BehaviorSubject<string>('');
  email$ = this.emailSubject.asObservable();
  private profileImageSubject = new BehaviorSubject<string>('');
  profileImage$ = this.profileImageSubject.asObservable();

  getUserInfo() {
    const token = this.cookieService.getToken();
    this.backendService.decodeToken(token).subscribe(
      (response) => {
        this.emailSubject.next(response.email);
        return response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  setCapturedImage(url: string) {
    this.profileImageSubject.next(url);
  }

  getCapturedImage(): string {
    return this.profileImageSubject.value;
  }
  clearCapturedImage() {
    this.profileImageSubject.next('');
  }

  setUser(username: string, profileImage: string): void {
    localStorage.setItem(this.usernameKey, username);
    localStorage.setItem(this.profileImageKey, profileImage);
  }

  getUsername(): string | null {
    if (typeof window !== 'undefined' && localStorage.getItem('username')) {
      return localStorage.getItem('username');
    }
    return null;
  }

  getProfileImage(): string | null {
    if (typeof window !== 'undefined' && localStorage.getItem('profileImage')) {
      return localStorage.getItem('profileImage');
    }
    return null;
  }
  getUserEmail() {
    return this.emailSubject.value;
  }

  clearUser(): void {
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.profileImageKey);
  }
}
