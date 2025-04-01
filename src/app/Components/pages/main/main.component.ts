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

  constructor(
    public themeService: ThemeService,
    public jikanService: JikanService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadAnimes(1);
    this.loadMangas(1);
  }

  loadAnimes(page: number) {
    this.jikanService.getTopAnimes(page).subscribe((response) => {
      this.topAnimes = response.data;
    });
  }

  loadMangas(page: number) {
    this.jikanService.getTopMangas(page).subscribe((response) => {
      this.topMangas = response.data;
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
