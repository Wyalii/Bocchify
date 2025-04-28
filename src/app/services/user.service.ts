import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usernameKey = 'username';
  private profileImageKey = 'profileImage';

  constructor() {}

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
