import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-theme-control-component',
  imports: [],
  templateUrl: './theme-control-component.html',
  styleUrl: './theme-control-component.scss',
})
export class ThemeControlComponent {
  themeService: ThemeService = inject(ThemeService);
  isPixelArt = this.themeService.pixelMode;
  currentTheme = this.themeService.theme;
}
