import { Component, effect } from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { ThemeService } from '../../services/theme.service';
import { BurgerServiceService } from '../../services/burger-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CookieServiceService } from '../../services/cookie-service.service';

@Component({
  selector: 'app-burger-menu',
  imports: [ThemeBtn, CommonModule, RouterLink],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss',
})
export class BurgerMenuComponent {
  slideClass: string = 'slide-right';

  constructor(
    public themeService: ThemeService,
    public burgerMenuService: BurgerServiceService,
    private cookieService: CookieServiceService
  ) {}
  handleAnimation() {
    this.slideClass =
      this.slideClass == 'slide-left' ? 'slide-right' : 'slide-left';
  }

  isLoggedIn() {
    const token = this.cookieService.getToken();
    if (token && token.trim() !== '') {
      return true;
    }
    return false;
  }
}
