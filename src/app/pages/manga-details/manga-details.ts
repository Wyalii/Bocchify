import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JikanApiService } from '../../services/jikan-api-service';
import { ThemeService } from '../../services/theme-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manga-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './manga-details.html',
  styleUrl: './manga-details.scss',
})
export class MangaDetails {
  mangaId: string | null = null;
  mangaDetails = signal<any>({});
  favourited: boolean = false;
  isFetchingDetails: boolean = false;
  jikanApiService: JikanApiService = inject(JikanApiService);
  themeService: ThemeService = inject(ThemeService);
  route: ActivatedRoute = inject(ActivatedRoute);
  constructor() {
    this.mangaId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getMangaDetailsFunc();
  }

  getMangaDetailsFunc() {
    console.log('hit here');
    this.isFetchingDetails = true;
    if (this.mangaId) {
      this.jikanApiService
        .getMangaDetails(this.mangaId)
        .subscribe((response) => {
          this.mangaDetails.set(response.data);
          this.favourited = response.isFavourited;
          this.isFetchingDetails = false;
        });
    }
  }

  addToFavouritesFunc(mal_id: number) {
    // this.isFetchingDetails = true;
    // const token = this.cookieService.getToken();
    // if (token === '' || null) {
    //   this.isFetchingDetails = false;
    //   return this.toastr.error('Please login first.', 'Error');
    // }
    // const request: FavouriteRequestInterface = {
    //   token: token,
    //   mal_id: mal_id,
    //   type: 'manga',
    // };
    // return this.backendService.favouriteHandler(request).subscribe(
    //   (data) => {
    //     this.isFetchingDetails = true;
    //     this.getMangaDetailsFunc();
    //   },
    //   (error) => {
    //     this.isFetchingDetails = false;
    //     console.log(error);
    //   }
    // );
  }
}
