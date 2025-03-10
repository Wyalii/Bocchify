import { Component, CUSTOM_ELEMENTS_SCHEMA, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
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
export class MainComponent {
  topAnimes$: Observable<any[]> = of([]);
  topMangas$: Observable<any[]> = of([]);

  constructor(
    public themeService: ThemeService,
    public jikanService: JikanService,
    private router: Router
  ) {
    this.topAnimes$ = this.jikanService.getTopAnimes();
    this.topMangas$ = this.jikanService.getTopMangas();
  }

  navigateToAnimeDetails(AnimeId: number) {
    this.router.navigate(['/anime', AnimeId]);
  }

  navigateToMangaDetails(MangaId: number) {
    this.router.navigate(['/manga', MangaId]);
  }
}
