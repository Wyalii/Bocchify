import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { CommonModule } from '@angular/common';
import { ThemeMode } from '../../interfaces/theme-mode';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  themeService: ThemeService = inject(ThemeService);
  isPixelArt = this.themeService.pixelMode;
  currentTheme = this.themeService.theme;
  themeOptions = ['bocchi', 'ryo', 'ikuyo', 'nikija'] as const;
  setTheme(newTheme: ThemeMode) {
    this.themeService.setTheme(newTheme);
  }
}
