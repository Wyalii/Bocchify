import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private CookieService = inject(CookieService);
  themeSignal = signal<string>(this.getStoredTheme() || 'dark');

  private getStoredTheme(): string {
    return this.CookieService.get('user-theme') || 'dark';
  }

  setTheme(theme: string) {
    this.themeSignal.set(theme);
    localStorage.setItem('user-theme', theme);
  }
  updateTheme() {
    this.themeSignal.update((value) => {
      const newTheme = value === 'dark' ? 'light' : 'dark';
      this.CookieService.set('user-theme', newTheme, 365);
      return newTheme;
    });
  }
}
