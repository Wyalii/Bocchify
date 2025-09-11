import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeMode } from '../../interfaces/theme-mode';
import { Router } from '@angular/router';
import { JikanApiService } from '../../services/jikan-api-service';
import { ThemeControlComponent } from '../theme-control-component/theme-control-component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, ThemeControlComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
  searchQuery: string = '';
  jikanApiService: JikanApiService = inject(JikanApiService);
  themeService: ThemeService = inject(ThemeService);
  router: Router = inject(Router);
  currentTheme = this.themeService.theme;
  isPixelArt = this.themeService.pixelMode;
  search() {
    console.log(this.searchQuery);
    this.jikanApiService.searchQuery.set(this.searchQuery);
    this.router.navigate(['/animeSearchResults']);
  }

  goToLoginPage() {
    this.router.navigate(['/login']);
  }
  goToMain() {
    this.router.navigate(['']);
  }
}
