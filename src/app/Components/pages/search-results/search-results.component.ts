import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JikanService } from '../../../services/jikan.service';
import { AnimeCardComponent } from '../../anime-card/anime-card.component';
import { MangaCardComponent } from '../../manga-card/manga-card.component';
@Component({
  selector: 'app-search-results',
  imports: [CommonModule, AnimeCardComponent, MangaCardComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchResultsComponent {
  breakpoints = {
    1020: { slidesPerView: 2 },
    1520: { slidesPerView: 3 },
  };
  constructor(public jikanService: JikanService) {}
}
