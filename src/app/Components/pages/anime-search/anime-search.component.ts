import { Component, Injectable, OnInit } from '@angular/core';
import { JikanService } from '../../../services/jikan.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-anime-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './anime-search.component.html',
  styleUrl: './anime-search.component.scss',
})
export class AnimeSearchComponent implements OnInit {
  constructor(
    private jikanService: JikanService,
    private router: Router,
    public themeService: ThemeService
  ) {}
  ngOnInit(): void {
    this.loadAnimes(this.currentPage);
  }
  searchAnimes: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  hasNextPage: boolean = false;
  inputPage: number = 1;

  loadAnimes(page: number) {
    this.jikanService
      .AnimeSearch(this.jikanService.searchInput(), page)
      .subscribe((response) => {
        this.searchAnimes = response.data;
        this.currentPage = response.pagination.current_page;
        this.totalPages = response.pagination.last_visible_page;
        this.hasNextPage = response.pagination.has_next_page;
        this.inputPage = this.currentPage;
      });
  }

  goToPage() {
    if (this.inputPage >= 1 && this.inputPage <= this.totalPages) {
      this.loadAnimes(this.inputPage);
    } else {
      alert('Please enter a valid page number!');
      this.inputPage = this.currentPage;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.loadAnimes(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.hasNextPage) {
      this.loadAnimes(this.currentPage + 1);
    }
  }

  navigateToAnimeDetails(AnimeId: number) {
    this.router.navigate(['/anime', AnimeId]);
  }
}
