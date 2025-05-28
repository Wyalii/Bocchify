import { Component, OnInit } from '@angular/core';
import { CookieServiceService } from '../../services/cookie-service.service';
import { BackendService } from '../../services/backend.service';
import { JikanService } from '../../services/jikan.service';

@Component({
  selector: 'app-favourites-list',
  imports: [],
  templateUrl: './favourites-list.component.html',
  styleUrl: './favourites-list.component.scss',
})
export class FavouritesListComponent implements OnInit {
  constructor(
    private cookieService: CookieServiceService,
    private backendService: BackendService,
    private jikanService: JikanService
  ) {}
  token: string = '';
  ngOnInit(): void {
    this.fetchUserFavourites();
  }

  fetchUserFavourites() {
    this.token = this.cookieService.getToken();
    this.backendService.getFavourites(this.token).subscribe({
      next: (response) => {
        response.forEach((favourite) => {
          console.log(favourite.type);
          this.jikanService
            .getAnimeDetails(favourite.mal_Id.toString())
            .subscribe({
              next: (response) => {
                console.log(response);
              },
              error: (err) => {
                console.log(err);
              },
            });
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
