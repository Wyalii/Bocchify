import { Component, inject, OnInit, signal } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { CommonModule } from '@angular/common';
import { ThemeMode } from '../../interfaces/theme-mode';
import { FormsModule } from '@angular/forms';
import { JikanApiService } from '../../services/jikan-api-service';
import { CustomSwiper } from '../../components/custom-swiper/custom-swiper';
import { ThemeControlComponent } from '../../components/theme-control-component/theme-control-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [CommonModule, FormsModule, CustomSwiper, ThemeControlComponent],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage implements OnInit {
  router: Router = inject(Router);
  themeService: ThemeService = inject(ThemeService);
  jikanApiService: JikanApiService = inject(JikanApiService);
  isPixelArt = this.themeService.pixelMode;
  currentTheme = this.themeService.theme;
  themeOptions = ['bocchi', 'ryo', 'ikuyo', 'nikija'] as const;
  animeData = signal<any[]>([]);
  mangaData = signal<any[]>([]);
  ngOnInit(): void {
    if (localStorage.getItem('Bocchify-PixelMode') === 'true') {
      this.themeService.pixelMode.set(true);
    } else {
      this.themeService.pixelMode.set(false);
    }
    this.fetchTopAnimes();
    this.fetchTopMangas();
  }
  fetchTopAnimes() {
    this.jikanApiService.getTopAnimes().subscribe({
      next: (res) => {
        console.log(res.get(1));
        const response = res.get(1);
        this.animeData.set([...response.data]);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('succesfully fetched data.');
      },
    });
  }

  fetchTopMangas() {
    this.jikanApiService.getTopMangas().subscribe({
      next: (res) => {
        console.log(res.get(1));
        const response = res.get(1);
        this.mangaData.set([...response.data]);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('succesfully fetched data.');
      },
    });
  }

  goToTopAnimePage() {
    this.router.navigate(['/topAnimesPage']);
  }
  goToTopMangaPage() {
    this.router.navigate(['/topMangasPage']);
  }
}
