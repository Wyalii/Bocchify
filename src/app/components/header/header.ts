import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeMode } from '../../interfaces/theme-mode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  themeService: ThemeService = inject(ThemeService);
  router: Router = inject(Router);
  currentTheme = this.themeService.theme;
  isPixelArt = this.themeService.pixelMode;
  setTheme(newTheme: ThemeMode) {
    this.themeService.setTheme(newTheme);
  }
  goToLoginPage() {
    this.router.navigate(['/login']);
  }
}
