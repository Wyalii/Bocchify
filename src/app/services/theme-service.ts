import { computed, Injectable, signal } from '@angular/core';
import { ThemeMode } from '../interfaces/theme-mode';
import { ThemeData } from '../interfaces/theme-data';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  userTheme = signal<ThemeMode>('bocchi');
  pixelMode = signal<boolean>(false);

  private themeMap: Record<ThemeMode, ThemeData> = {
    bocchi: {
      backgroundColor: '#f5a2b5',
      backgroundImage: 'bocchi-landing.png',
      backgroundImagePixel: 'bocchi-landing-pixel.png',
      smallImage: 'bocchi.jpeg',
      smallImagePixel: 'bocchi-pixel.png',
    },
    ryo: {
      backgroundColor: '#0675c9',
      backgroundImage: 'ryo-landing.png',
      backgroundImagePixel: 'ryo-landing-pixel.png',
      smallImage: 'ryo.jpg',
      smallImagePixel: 'ryo-pixel.png',
    },
    ikuyo: {
      backgroundColor: '#e80c05',
      backgroundImage: 'ikuyo-landing.png',
      backgroundImagePixel: 'ikuyo-landing-pixel.png',
      smallImage: 'ikuyo.jpg',
      smallImagePixel: 'ikuyo-pixel.png',
    },
    nikija: {
      backgroundColor: '#e8e805',
      backgroundImage: 'nikija-landing.png',
      backgroundImagePixel: 'nikija-landing-pixel.png',
      smallImage: 'nikija.jpg',
      smallImagePixel: 'nikija-pixel.png',
    },
  };

  currentMode = computed(() => this.userTheme());
  theme = computed(() => this.themeMap[this.userTheme()]);

  setTheme(newMode: ThemeMode) {
    this.userTheme.set(newMode);
  }

  cycleTheme() {
    const order: ThemeMode[] = ['bocchi', 'ryo', 'ikuyo', 'nikija'];
    const currentIndex = order.indexOf(this.userTheme());
    const nextMode = order[(currentIndex + 1) % order.length];
    this.userTheme.set(nextMode);
  }
}
