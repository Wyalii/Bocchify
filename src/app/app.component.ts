import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { ThemeBtn } from './Components/ThemeBtn/ThemeBtn.component';
import { Form } from './Components/Form/form.component';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { HeaderComponent } from './Components/header/header.component';
import { SpotifyServiceService } from './services/spotify-service.service';
import { eventNames } from 'process';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ThemeBtn,
    CommonModule,
    Form,
    LandingComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'Bocchify';
  currentRoute: string = '';
  accessToken: string = '';

  constructor(
    public themeService: ThemeService,
    private router: Router,
    private spotifyService: SpotifyServiceService
  ) {}
  ngOnInit(): void {
    this.CheckRoutes();
    this.getAccessToken();
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
        console.log(this.accessToken);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
