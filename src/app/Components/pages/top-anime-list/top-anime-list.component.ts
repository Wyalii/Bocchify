import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JikanService } from '../../../services/jikan.service';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-top-anime-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './top-anime-list.component.html',
  styleUrl: './top-anime-list.component.scss',
})
export class TopAnimeListComponent implements OnInit {
  topAnimes: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  hasNextPage: boolean = false;
  inputPage: number = 1;
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
      console.log(response);
      this.topAnimes = response.data;
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
