import { inject, Injectable, signal } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private CookieService = inject(CookieService);
  public bgImage: string = '';
  private themes = ['bocchi', 'ryo', 'nikija', 'ikuyo'];
  themeSignal = signal<string>(this.getStoredTheme());

  private getStoredTheme(): string {
    const userTheme = this.CookieService.get('user-theme') || 'bocchi';
    switch (userTheme) {
      case 'bocchi':
        this.bgImage = 'bocchi-landing.png';
        break;

      case 'ryo':
        this.bgImage = 'ryo-landing.png';
        break;

      case 'nikija':
        this.bgImage = 'nikija-landing.png';
        break;

      case 'ikuyo':
        this.bgImage = 'ikuyo-landing.png';
        break;

      default:
        break;
    }
    return userTheme;
  }

  setTheme(theme: string) {
    this.themeSignal.set(theme);
    localStorage.setItem('user-theme', theme);
    this.CookieService.set('user-theme', theme, 365);
  }

  updateTheme() {
    this.themeSignal.update((currentTheme) => {
      const currentIndex = this.themes.indexOf(currentTheme);
      const nextIndex = (currentIndex + 1) % this.themes.length;
      const newTheme = this.themes[nextIndex];
      this.CookieService.set('user-theme', newTheme, 365);
      localStorage.setItem('user-theme', newTheme);
      console.log(newTheme);
      switch (newTheme) {
        case 'bocchi':
          this.bgImage = 'bocchi-landing.png';
          break;

        case 'ryo':
          this.bgImage = 'ryo-landing.png';
          break;

        case 'nikija':
          this.bgImage = 'nikija-landing.png';
          break;

        case 'ikuyo':
          this.bgImage = 'ikuyo-landing.png';
          break;

        default:
          break;
      }
      return newTheme;
    });
  }
}
