import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-anime-details',
  imports: [CommonModule],
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.scss',
})
export class AnimeDetailsComponent implements OnInit {
  safeTrailerUrl!: SafeResourceUrl;
  animeId: string | null = null;
  animeDetails: any = {};
  constructor(
    private route: ActivatedRoute,
    private animeService: AnimeService,
    public themeService: ThemeService,
    private sanitizer: DomSanitizer
  ) {
    this.animeId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    if (this.animeId) {
      this.animeService.getAnimeDetails(+this.animeId).subscribe((response) => {
        this.animeDetails = response;
        console.log('log from ng on init: ');
        console.log(this.animeDetails);

        if (this.animeDetails.trailer?.embed_url) {
          this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.animeDetails.trailer.embed_url
          );
        }
      });
    }
  }
}
