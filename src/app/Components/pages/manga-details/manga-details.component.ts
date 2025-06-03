import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JikanService } from '../../../services/jikan.service';
import { ThemeService } from '../../../services/theme.service';
import { CookieServiceService } from '../../../services/cookie-service.service';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../../services/backend.service';
import { FavouriteRequestInterface } from '../../../interfaces/favourite-request-interface';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-manga-details',
  imports: [CommonModule,FormsModule],
  templateUrl: './manga-details.component.html',
  styleUrl: './manga-details.component.scss',
})
export class MangaDetailsComponent implements OnInit {
  mangaId: string | null = null;
  mangaDetails: any = {};
  favourited: boolean = false;
  isFetchingDetails: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private jikanService: JikanService,
    public themeService: ThemeService,
    private cookieService: CookieServiceService,
    private toastr: ToastrService,
    private backendService: BackendService
  ) {
    this.mangaId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getMangaDetailsFunc();
  }

  getMangaDetailsFunc() {
    this.isFetchingDetails = true;
    if (this.mangaId) {
      this.jikanService.getMangaDetails(this.mangaId).subscribe((response) => {
        this.mangaDetails = response.data;
        this.favourited = response.isFavourited;
        this.isFetchingDetails = false;
      });
    }
  }

  addToFavouritesFunc(mal_id: number) {
    this.isFetchingDetails = true;
    console.log(mal_id);
    const token = this.cookieService.getToken();
    if (token === '' || null) {
      this.isFetchingDetails = false;
      return this.toastr.error('Please login first.', 'Error');
    }

    const request: FavouriteRequestInterface = {
      token: token,
      mal_id: mal_id,
      type: 'manga',
    };

    return this.backendService.favouriteHandler(request).subscribe(
      (data) => {
        this.isFetchingDetails = true;
        console.log(data);
        this.getMangaDetailsFunc();
      },
      (error) => {
        this.isFetchingDetails = false;
        console.log(error);
      }
    );
  }
}
