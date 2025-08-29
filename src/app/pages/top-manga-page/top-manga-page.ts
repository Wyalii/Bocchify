import { Component, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { JikanApiService } from '../../services/jikan-api-service';
import { ThemeService } from '../../services/theme-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-manga-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './top-manga-page.html',
  styleUrl: './top-manga-page.scss',
})
export class TopMangaPage {
  topMangas: any = signal(null);
  currentPage: number = 1;
  totalPages: number = 1;
  hasNextPage: boolean = false;
  inputPage: number = 1;
  jikanApiService: JikanApiService = inject(JikanApiService);
  router: Router = inject(Router);
  themeService: ThemeService = inject(ThemeService);

  private _searchEffect = effect(() => {
    const query = this.jikanApiService.searchQuery();
    if (query) {
      this.loadMangas(1);
    }
  });
  ngOnInit() {
    this.loadMangas(this.currentPage);
  }
  loadMangas(page: number) {
    this.jikanApiService.getTopMangas(page).subscribe((response) => {
      this.currentPage = page;
      console.log(response.get(1));
      this.topMangas.set(response.get(page));
      console.log('top Mangas list :::');
      console.log(this.topMangas());
    });
  }

  goToPage() {
    this.loadMangas(this.inputPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadMangas(this.currentPage - 1);
    }
  }

  nextPage() {
    this.loadMangas(this.currentPage + 1);
    console.log(this.loadMangas(this.currentPage + 1));
  }

  navigateToMangaDetails(MangaId: number) {
    this.router.navigate(['/Manga', MangaId]);
  }
}
