import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JikanApiService } from '../../services/jikan-api-service';
import { ThemeService } from '../../services/theme-service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeControlComponent } from '../../components/theme-control-component/theme-control-component';

@Component({
  selector: 'app-anime-details',
  imports: [CommonModule, FormsModule, ThemeControlComponent],
  templateUrl: './anime-details.html',
  styleUrl: './anime-details.scss',
})
export class AnimeDetails {
  safeTrailerUrl!: SafeResourceUrl;
  animeId: string | null = null;
  animeDetails = signal<any>({});
  favourited: boolean = false;
  isFetchingDetails: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute);
  jikanApiService: JikanApiService = inject(JikanApiService);
  themeService: ThemeService = inject(ThemeService);
  sanitizer: DomSanitizer = inject(DomSanitizer);

  constructor() {
    this.animeId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getAnimeDetailsFunc();
  }

  getAnimeDetailsFunc() {
    this.isFetchingDetails = true;
    if (this.animeId) {
      this.jikanApiService.getAnimeDetails(this.animeId).subscribe(
        (data: any) => {
          console.log(data);
          this.animeDetails.set(data.data);
          this.favourited = data.isFavourited;
          if (this.animeDetails().trailer?.embed_url) {
            this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.animeDetails().trailer.embed_url
            );
          }
          this.isFetchingDetails = false;
        },
        (error) => {
          console.log(error);
          this.isFetchingDetails = false;
        }
      );
    }
  }

  addToFavouritesFunc(mal_id: number) {
    // this.isFetchingDetails = true;
    // const token = this.cookieService.getToken();
    // if (!token) {
    //   this.isFetchingDetails = false;
    //   return this.toastr.error('Please login first.', 'Error');
    // }
    // const request: FavouriteRequestInterface = {
    //   token: token,
    //   mal_id: mal_id,
    //   type: 'anime',
    // };
    // return this.backendService.favouriteHandler(request).subscribe(
    //   (data) => {
    //     this.isFetchingDetails = true;
    //     this.getAnimeDetailsFunc();
    //   },
    //   (error) => {
    //     this.isFetchingDetails = false;
    //     console.log(error);
    //   }
  }
}
