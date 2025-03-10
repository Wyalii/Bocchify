import { Component } from '@angular/core';
import { JikanService } from '../../../services/jikan.service';
import { ThemeService } from '../../../services/theme.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-manga-list',
  imports: [CommonModule],
  templateUrl: './top-manga-list.component.html',
  styleUrl: './top-manga-list.component.scss',
})
export class TopMangaListComponent {
  topMangas: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  hasNextPage: boolean = false;
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
    });
  }
  navigateToMangaDetails(MangaId: number) {
    this.router.navigate(['/manga', MangaId]);
  }
}
