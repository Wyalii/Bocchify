import { Component, ViewEncapsulation, OnInit, inject } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { HeaderComponent } from './Components/header/header.component';
import { SpotifyServiceService } from './services/spotify-service.service';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './services/token.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LandingComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'Bocchify';
  currentRoute: string = '';
  accessToken: string = '';
  cookieService = inject(CookieService);
  tokenService = inject(TokenService);
  decodedToken: any;
  constructor(
    public themeService: ThemeService,
    private router: Router,
    private spotifyService: SpotifyServiceService
  ) {}
  ngOnInit(): void {
    this.CheckRoutes();
    this.getAccessToken();
    this.tokenService.decodeUserToken();
  }

  CheckRoutes() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });
  }
  getAccessToken() {
    this.spotifyService.getAccessToken().subscribe(
      (response) => {
        this.accessToken = response.accessToken;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
