import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { JikanService } from '../../../services/jikan.service';
import { ThemeService } from '../../../services/theme.service';

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
    private jikanService: JikanService,
    public themeService: ThemeService
  ) {
    this.mangaId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    if (this.mangaId) {
      this.jikanService.getMangaDetails(this.mangaId).subscribe((response) => {
        this.mangaDetails = response;
      });
    }
  }
}
