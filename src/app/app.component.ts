import {
  Component,
  ViewEncapsulation,
  OnInit,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { HeaderComponent } from './Components/header/header.component';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './services/token.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LandingComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'Bocchify';
  currentRoute: string = '';
  cookieService = inject(CookieService);
  tokenService = inject(TokenService);
  constructor(public themeService: ThemeService, private router: Router) {}
  ngOnInit(): void {
    this.CheckRoutes();
    this.tokenService.decodeUserToken();
  }

  CheckRoutes() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
      }
    });
  }
}
