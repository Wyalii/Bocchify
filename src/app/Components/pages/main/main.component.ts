import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Injectable,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnimeCardComponent } from '../../anime-card/anime-card.component';
import { MangaCardComponent } from '../../manga-card/manga-card.component';
import { ThemeService } from '../../../services/theme.service';
import { JikanService } from '../../../services/jikan.service';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-main',
  imports: [CommonModule, AnimeCardComponent, MangaCardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainComponent implements OnInit {
  topAnimes: any[] = [];
  topMangas: any[] = [];
  isLoadingAnimes: boolean = false;
  isLoadingMangas: boolean = false;
  constructor(
    public themeService: ThemeService,
    public jikanService: JikanService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadAnimes(1);
    setTimeout(() => {
      this.loadMangas(1);
    }, 1500);
    1;
  }

  loadAnimes(page: number) {
    this.isLoadingAnimes = true;
    this.jikanService.getTopAnimes(page).subscribe({
      next: (response) => {
        this.topAnimes = response.data;
        this.isLoadingAnimes = false;
      },
      error: (err) => {
        console.error('Error loading animes', err);
        this.isLoadingAnimes = false;
      },
    });
  }

  loadMangas(page: number) {
    this.isLoadingMangas = true;
    this.jikanService.getTopMangas(page).subscribe({
      next: (response) => {
        this.topMangas = response.data;
        this.isLoadingMangas = false;
      },
      error: (err) => {
        console.error('Error loading animes', err);
        this.isLoadingMangas = false;
      },
    });
  }

  navigateToAnimeDetails(AnimeId: number) {
    this.router.navigate(['/anime', AnimeId]);
  }

  navigateToMangaDetails(MangaId: number) {
    this.router.navigate(['/manga', MangaId]);
  }
  navigateToTopAnimeList() {
    this.router.navigate(['/topAnimes']);
  }
  navigateToTopMangaList() {
    this.router.navigate(['/topMangas']);
  }
}
