import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  themeService: ThemeService = inject(ThemeService);
  isPixelArt = this.themeService.pixelMode;
  currentTheme = this.themeService.theme();
}
