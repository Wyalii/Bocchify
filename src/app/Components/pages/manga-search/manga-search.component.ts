import { Component } from '@angular/core';
import { JikanService } from '../../../services/jikan.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-manga-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './manga-search.component.html',
  styleUrl: './manga-search.component.scss',
})
export class MangaSearchComponent {
  constructor(
    private jikanService: JikanService,
    private router: Router,
    public themeService: ThemeService
  ) {}
  ngOnInit(): void {
    this.loadMangas(this.currentPage);
  }
  searchMangas: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  hasNextPage: boolean = false;
  inputPage: number = 1;

  loadMangas(page: number) {
    this.jikanService
      .MangaSearch(this.jikanService.searchInput(), page)
      .subscribe((response) => {
        console.log(response);
        this.searchMangas = response.data;
        this.currentPage = response.pagination.current_page;
        this.totalPages = response.pagination.last_visible_page;
        this.hasNextPage = response.pagination.has_next_page;
        this.inputPage = this.currentPage;
      });
  }

  goToPage() {
    if (this.inputPage >= 1 && this.inputPage <= this.totalPages) {
      this.loadMangas(this.inputPage);
    } else {
      alert('Please enter a valid page number!');
      this.inputPage = this.currentPage;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadMangas(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.hasNextPage) {
      this.loadMangas(this.currentPage + 1);
    }
  }

  navigateToMangaDetails(MangaId: number) {
    this.router.navigate(['/manga', MangaId]);
  }
}
