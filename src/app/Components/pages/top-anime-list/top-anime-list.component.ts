import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimeCardComponent } from '../../anime-card/anime-card.component';
import { JikanService } from '../../../services/jikan.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
@Component({
  selector: 'app-top-anime-list',
  imports: [AnimeCardComponent, CommonModule],
  templateUrl: './top-anime-list.component.html',
  styleUrl: './top-anime-list.component.scss',
})
export class TopAnimeListComponent implements OnInit {
  topAnimes: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  hasNextPage: boolean = false;
  constructor(
    public jikanService: JikanService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.loadAnimes(this.currentPage);
  }
  loadAnimes(page: number) {
    this.jikanService.getTopAnimes(page).subscribe((response) => {
      this.topAnimes = response.data;
      this.currentPage = response.pagination.current_page;
      this.totalPages = response.pagination.last_visible_page;
      this.hasNextPage = response.pagination.has_next_page;
    });
  }
  navigateToAnimeDetails(AnimeId: number) {
    this.router.navigate(['/anime', AnimeId]);
  }
}
