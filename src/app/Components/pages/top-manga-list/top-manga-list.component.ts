import { Component } from '@angular/core';
import { JikanService } from '../../../services/jikan.service';
import { ThemeService } from '../../../services/theme.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-manga-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './top-manga-list.component.html',
  styleUrl: './top-manga-list.component.scss',
})
export class TopMangaListComponent {
  topMangas: any[] = [];
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
    this.loadMangas(this.currentPage);
  }
  loadMangas(page: number) {
    this.jikanService.getTopMangas(page).subscribe((response) => {
      this.topMangas = response.data;
      this.currentPage = response.pagination.current_page;
      this.totalPages = response.pagination.last_visible_page;
      this.hasNextPage = response.pagination.has_next_page;
      this.inputPage = response.pagination.current_page;
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
