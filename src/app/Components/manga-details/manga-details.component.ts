import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { ThemeService } from '../../services/theme.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manga-details',
  imports: [CommonModule],
  templateUrl: './manga-details.component.html',
  styleUrl: './manga-details.component.scss',
})
export class MangaDetailsComponent implements OnInit {
  mangaId: string | null = null;
  mangaDetails: any = {};
  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService,
    public themeService: ThemeService,
    private sanitizer: DomSanitizer
  ) {
    this.mangaId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    if (this.mangaId) {
      this.animeService.getMangaDetails(this.mangaId).subscribe((response) => {
        this.mangaDetails = response;
      });
    }
  }
}
