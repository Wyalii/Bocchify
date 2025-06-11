import { Component, OnInit } from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { ThemeService } from '../../services/theme.service';
import { BlurService } from '../../services/blur.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CookieServiceService } from '../../services/cookie-service.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-burger-menu',
  imports: [ThemeBtn, CommonModule, RouterLink],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss',
})
export class BurgerMenuComponent implements OnInit {
  slideClass: string = 'slide-right';
  profilePicture: string | null = null;
  username: string | null = null;
  constructor(
    public themeService: ThemeService,
    public blurService: BlurService,
    private cookieService: CookieServiceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.profilePicture = this.userService.getProfileImage();
    this.username = this.userService.getUsername();
  }
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

  logout()
  {
    this.userService.clearUser();
    this.cookieService.deleteToken()
    window.location.href = '/';
  }
}
