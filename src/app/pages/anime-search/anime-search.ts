import { Component, inject, OnInit, signal } from '@angular/core';
import { JikanApiService } from '../../services/jikan-api-service';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anime-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './anime-search.html',
  styleUrl: './anime-search.scss',
})
export class AnimeSearch implements OnInit {
  searchedAnimes: any = signal([]);
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
    this.jikanApiService
      .AnimeSearch(this.jikanApiService.searchQuery(), page)
      .subscribe((response) => {
        console.log(response);
        if (response.pagination.has_next_page === false) {
          this.hasNextPage = false;
        } else {
          this.hasNextPage = true;
        }
        this.currentPage = page;
        console.log('anime search result log...');
        console.log(response);
        this.searchedAnimes.set(response.data);
        console.log('searched anime list');
        console.log(this.searchedAnimes());
      });
  }
  goToPage() {
    if (this.hasNextPage === true) {
      this.loadAnimes(this.inputPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadAnimes(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.hasNextPage === true) {
      {
        this.loadAnimes(this.currentPage + 1);
        console.log(this.loadAnimes(this.currentPage + 1));
      }
    }
  }

  navigateToAnimeDetails(AnimeId: number) {
    this.router.navigate(['/anime', AnimeId]);
  }
}
