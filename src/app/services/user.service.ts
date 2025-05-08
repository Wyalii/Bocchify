import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}
  private usernameKey = 'username';
  private profileImageKey = 'profileImage';
  private profileImageSubject = new BehaviorSubject<string>('');
  profileImage$ = this.profileImageSubject.asObservable();

  setCapturedImage(url: string) {
    this.profileImageSubject.next(url);
  }

  getCapturedImage(): string {
    console.log(
      'log from get caputed image user service:',
      this.profileImageSubject.value
    );
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

  clearUser(): void {
    localStorage.removeItem(this.usernameKey);
    localStorage.removeItem(this.profileImageKey);
  }
}
