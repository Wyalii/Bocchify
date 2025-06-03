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
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-anime-details',
  imports: [CommonModule,FormsModule],
  templateUrl: './anime-details.component.html',
  styleUrl: './anime-details.component.scss',
})
export class AnimeDetailsComponent implements OnInit {
  safeTrailerUrl!: SafeResourceUrl;
  animeId: string | null = null;
  animeDetails: any = {};
  favourited: boolean = false;
  isFetchingDetails:boolean = false;
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
    this.isFetchingDetails = true;
    if (this.animeId) {
      this.jikanService
        .getAnimeDetails(this.animeId)
        .subscribe(
          (data: any) => {
          this.animeDetails = data.data;
          this.favourited = data.isFavourited;
          console.log('log from ng on init:', this.animeDetails, data);
          if (this.animeDetails.trailer?.embed_url) {
            this.safeTrailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.animeDetails.trailer.embed_url
            );
          }
          this.isFetchingDetails = false;
          
        },
      (error)=>
      {
        console.log(error)
         this.isFetchingDetails = false;
         
      });  
    }
  }

  addToFavouritesFunc(mal_id: number) {
    this.isFetchingDetails = true;
    console.log(mal_id);
    const token = this.cookieService.getToken();
    if (!token) {
      this.isFetchingDetails = false;
      return this.toastr.error('Please login first.', 'Error');
    }

    const request: FavouriteRequestInterface = {
      token: token,
      mal_id: mal_id,
      type: 'anime',
    };
    return this.backendService.favouriteHandler(request).subscribe(
      (data) => {
        this.isFetchingDetails = true;
        console.log(data);
        this.getAnimeDetailsFunc();
      },
      (error) => {
        this.isFetchingDetails = false;
        console.log(error);
      }
    );
  }
}
