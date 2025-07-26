import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { CommonModule } from '@angular/common';
import { ThemeMode } from '../../interfaces/theme-mode';
import { FormsModule } from '@angular/forms';
import { JikanApiService } from '../../services/jikan-api-service';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements OnInit {
  themeService: ThemeService = inject(ThemeService);
  jikanApiService: JikanApiService = inject(JikanApiService);
  isPixelArt = this.themeService.pixelMode;
  currentTheme = this.themeService.theme;
  themeOptions = ['bocchi', 'ryo', 'ikuyo', 'nikija'] as const;
  ngOnInit(): void {
    this.jikanApiService.getTopAnimes(2).subscribe({
      next: (res) => {
        console.log(res.get(1));
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('succesfully fetched data.');
      },
    });
  }
  setTheme(newTheme: ThemeMode) {
    this.themeService.setTheme(newTheme);
  }
}
