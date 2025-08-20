import { Component, inject, signal } from '@angular/core';
import { JikanApiService } from '../../services/jikan-api-service';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-anime-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './top-anime-page.html',
  styleUrl: './top-anime-page.scss',
})
export class TopAnimePage {
  topAnimes: any = signal(null);
  currentPage: number = 1;
  totalPages: number = 1;
  hasNextPage: boolean = false;
  inputPage: number = 1;
  jikanApiService: JikanApiService = inject(JikanApiService);
  router: Router = inject(Router);
  themeService: ThemeService = inject(ThemeService);

  ngOnInit() {
    this.loadAnimes(this.currentPage);
  }
  loadAnimes(page: number) {
    this.jikanApiService.getTopAnimes(page).subscribe((response) => {
      this.currentPage = page;
      console.log(response.get(1));
      this.topAnimes.set(response.get(page));
      console.log('top animes list :::');
      console.log(this.topAnimes());
    });
  }

  goToPage() {
    this.loadAnimes(this.inputPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadAnimes(this.currentPage - 1);
    }
  }

  nextPage() {
    this.loadAnimes(this.currentPage + 1);
    console.log(this.loadAnimes(this.currentPage + 1));
  }

  navigateToAnimeDetails(AnimeId: number) {
    this.router.navigate(['/anime', AnimeId]);
  }
}
