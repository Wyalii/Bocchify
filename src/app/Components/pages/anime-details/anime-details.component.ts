import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { JikanService } from '../../../services/jikan.service';
import { CookieServiceService } from '../../../services/cookie-service.service';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../../services/backend.service';
import { FavouriteRequestInterface } from '../../../interfaces/favourite-request-interface';

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
  favourited: boolean = false;
  isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private jikanService: JikanService,
    public themeService: ThemeService,
    private sanitizer: DomSanitizer,
    private cookieService: CookieServiceService,
    private toastr: ToastrService,
    private backendService: BackendService
  ) {
    this.animeId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getAnimeDetailsFunc();
  }

  getAnimeDetailsFunc() {
    if (this.animeId) {
      this.jikanService
        .getAnimeDetails(this.animeId)
        .subscribe((response: any) => {
          this.animeDetails = response.data;
          this.favourited = response.isFavourited;
          console.log('log from ng on init:', this.animeDetails, response);
          if (this.animeDetails.trailer?.embed_url) {
            this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.animeDetails.trailer.embed_url
            );
          }
        });
    }
  }

  addToFavouritesFunc(mal_id: number) {
    this.isLoading = true;
    console.log(mal_id);
    const token = this.cookieService.getToken();
    if (!token) {
      this.isLoading = false;
      return this.toastr.error('Please login first.', 'Error');
    }

    const request: FavouriteRequestInterface = {
      token: token,
      mal_id: mal_id,
      type: 'anime',
    };
    return this.backendService.favouriteHandler(request).subscribe(
      (data) => {
        this.isLoading = false;
        console.log(data);
        this.getAnimeDetailsFunc();
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
}
