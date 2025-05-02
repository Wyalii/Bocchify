import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JikanService } from '../../../services/jikan.service';
import { ThemeService } from '../../../services/theme.service';
import { CookieServiceService } from '../../../services/cookie-service.service';
import { ToastrService } from 'ngx-toastr';
import {
  BackendService,
  FavourteRequest,
} from '../../../services/backend.service';

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
  constructor(
    private route: ActivatedRoute,
    private jikanService: JikanService,
    public themeService: ThemeService,
    private cookieService: CookieServiceService,
    private toastr: ToastrService,
    private backendService: BackendService,
    private cdr: ChangeDetectorRef
  ) {
    this.mangaId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    if (this.mangaId) {
      this.jikanService.getMangaDetails(this.mangaId).subscribe((response) => {
        this.mangaDetails = response.data;
        this.favourited = response.isFavourited;
      });
    }
  }

  addToFavouritesFunc(mal_id: number) {
    console.log(mal_id);
    const token = this.cookieService.getToken();
    if (token === '' || null) {
      return this.toastr.error('Please login first.', 'Error');
    }

    const request: FavourteRequest = {
      token: token,
      mal_id: mal_id,
    };

    return this.backendService.favouriteHandler(request).subscribe(
      (data) => {
        console.log(data);
        this.favourited = data.favourited;
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
