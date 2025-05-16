import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JikanService } from '../../../services/jikan.service';
import { ThemeService } from '../../../services/theme.service';
import { CookieServiceService } from '../../../services/cookie-service.service';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../../../services/backend.service';
import { FavouriteRequestInterface } from '../../../interfaces/favourite-request-interface';

@Component({
  selector: 'app-manga-details',
  imports: [CommonModule],
  templateUrl: './manga-details.component.html',
  styleUrl: './manga-details.component.scss',
})
export class MangaDetailsComponent implements OnInit {
  mangaId: string | null = null;
  mangaDetails: any = {};
  favourited: boolean = false;
  isLoading: boolean = false;
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
    if (this.mangaId) {
      this.jikanService.getMangaDetails(this.mangaId).subscribe((response) => {
        this.mangaDetails = response.data;
        this.favourited = response.isFavourited;
      });
    }
  }

  addToFavouritesFunc(mal_id: number) {
    this.isLoading = true;
    console.log(mal_id);
    const token = this.cookieService.getToken();
    if (token === '' || null) {
      this.isLoading = false;
      return this.toastr.error('Please login first.', 'Error');
    }

    const request: FavouriteRequestInterface = {
      token: token,
      mal_id: mal_id,
    };

    return this.backendService.favouriteHandler(request).subscribe(
      (data) => {
        this.isLoading = false;
        console.log(data);
        this.getMangaDetailsFunc();
      },
      (error) => {
        this.isLoading = false;
        console.log(error);
      }
    );
  }
}
