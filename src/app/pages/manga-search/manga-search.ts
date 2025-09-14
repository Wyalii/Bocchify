import { Component, inject, signal } from '@angular/core';
import { JikanApiService } from '../../services/jikan-api-service';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeControlComponent } from '../../components/theme-control-component/theme-control-component';

@Component({
  selector: 'app-manga-search',
  imports: [CommonModule, FormsModule, ThemeControlComponent],
  templateUrl: './manga-search.html',
  styleUrl: './manga-search.scss',
})
export class MangaSearch {
  searchedMangas: any = signal([]);
  currentPage: number = 1;
  totalPages: number = 1;
  hasNextPage: boolean = false;
  inputPage: number = 1;
  jikanApiService: JikanApiService = inject(JikanApiService);
  router: Router = inject(Router);
  themeService: ThemeService = inject(ThemeService);

  ngOnInit() {
    this.loadMangas(this.currentPage);
  }
  loadMangas(page: number) {
    this.jikanApiService
      .MangaSearch(this.jikanApiService.searchQuery(), page)
      .subscribe((response: any) => {
        console.log(response);
        if (response.pagination.has_next_page === false) {
          this.hasNextPage = false;
        } else {
          this.hasNextPage = true;
        }
        this.currentPage = page;
        console.log('Manga search result log...');
        console.log(response);
        this.searchedMangas.set(response.data);
        console.log('searched Manga list');
        console.log(this.searchedMangas());
      });
  }
  goToPage() {
    if (this.hasNextPage === true) {
      this.loadMangas(this.inputPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadMangas(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.hasNextPage === true) {
      {
        this.loadMangas(this.currentPage + 1);
        console.log(this.loadMangas(this.currentPage + 1));
      }
    }
  }

  navigateToMangaDetails(MangaId: number) {
    this.router.navigate(['/manga', MangaId]);
  }
  goToAnimeSearchResults() {
    this.router.navigateByUrl('/animeSearchResults');
  }
}
