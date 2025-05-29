import { Component, OnInit } from '@angular/core';
import { CookieServiceService } from '../../services/cookie-service.service';
import { BackendService } from '../../services/backend.service';
import { JikanService } from '../../services/jikan.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favourites-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './favourites-list.component.html',
  styleUrl: './favourites-list.component.scss',
})
export class FavouritesListComponent implements OnInit {
  constructor(
    private cookieService: CookieServiceService,
    private backendService: BackendService,
    private jikanService: JikanService,
    public themeService:ThemeService,
    private router:Router
  ) {}
  token: string = '';
  favourites:any[]= [];
  isLoading:boolean = false;
  ngOnInit(): void {
    this.fetchUserFavourites();
  }

  fetchUserFavourites() {
    this.isLoading = true;
    this.token = this.cookieService.getToken();
    this.backendService.getFavourites(this.token).subscribe({
      next: (response) => {
        response.forEach((favourite) => {
          if(favourite.type === "anime")
          {
             this.jikanService
            .getAnimeDetails(favourite.mal_Id.toString())
            .subscribe({
              next: (response) => {
                this.favourites.push({
                type: 'anime',
                data: response.data
              });
              },
              error: (err) => {
                console.log(err);
              },
            });
          }
          if(favourite.type === "manga")
          {
             this.jikanService
            .getMangaDetails(favourite.mal_Id.toString())
            .subscribe({
              next: (response) => {
                this.favourites.push({
                type: 'manga',
                data: response.data
              });
              },
              error: (err) => {
                console.log(err);
              },
            });
          }
          
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
    console.log(this.favourites)
  }

navigateToDetails(favourite: any) {
   let type:string = favourite.type
   let id:number = favourite.data.mal_id;
   this.router.navigate([`${type}`,id])
}



}
