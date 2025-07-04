import {
  Component,
  ViewEncapsulation,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
  Inject,
  OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { CookieService } from 'ngx-cookie-service';
import { BurgerMenuComponent } from './Components/burger-menu/burger-menu.component';
import { trigger, style, transition, animate } from '@angular/animations';
import { BlurService } from './services/blur.service';
import { WebcamMenuComponent } from './Components/webcam-menu/webcam-menu.component';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    BurgerMenuComponent,
    WebcamMenuComponent,
  ],
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
export class AppComponent implements OnInit{
  title = 'Bocchify';
  cookieService = inject(CookieService);
  userService = inject(UserService)
  profilePicture!: string | null;
  constructor(
    public themeService: ThemeService,
    public blurService: BlurService,
    public router: Router
  ) {}
  ngOnInit(): void {
    this.profilePicture = this.userService.getProfileImage()
  }

  isOnMainRoute(): boolean {
    return this.router.url === '/';
  }
}
