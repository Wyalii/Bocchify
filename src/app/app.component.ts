import {
  Component,
  ViewEncapsulation,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { CookieService } from 'ngx-cookie-service';
import { BurgerMenuComponent } from './Components/burger-menu/burger-menu.component';
import { BurgerServiceService } from './services/burger-service.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, BurgerMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '0.5s ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '0.5s ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'Bocchify';
  cookieService = inject(CookieService);

  constructor(
    public themeService: ThemeService,
    public burgerMenuService: BurgerServiceService,
    public router: Router
  ) {}

  isOnMainRoute(): boolean {
    return this.router.url === '/main';
  }
}
