import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../services/anime.service';
import { AnimeCardComponent } from '../anime-card/anime-card.component';
import { MangaCardComponent } from '../manga-card/manga-card.component';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  imports: [CommonModule, AnimeCardComponent, MangaCardComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainComponent {
  topAnimes$: Observable<any[]> = of([]);
  topMangas$: Observable<any[]> = of([]);

  constructor(
    public themeService: ThemeService,
    public animeService: AnimeService,
    private router: Router
  ) {
    this.topAnimes$ = this.animeService.getTopAnimes();
    this.topMangas$ = this.animeService.getTopMangas();
  }

  navigateToAnimeDetails(AnimeId: number) {
    this.router.navigate(['/anime', AnimeId]);
  }

  navigateToMangaDetails(MangaId: number) {
    this.router.navigate(['/manga', MangaId]);
  }
}
