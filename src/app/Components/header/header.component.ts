import { Component, Injectable, OnInit } from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { BurgerServiceService } from '../../services/burger-service.service';
import { FormsModule } from '@angular/forms';
import { JikanService } from '../../services/jikan.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CookieServiceService } from '../../services/cookie-service.service';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-header',
  imports: [ThemeBtn, CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  slideClass: string = 'slide-right';
  searchQuery: string = '';
  authChecked: boolean = false;
  isUserAuthenticated: boolean = false;
  profilePicture: string | null = null;
  username: string | null = null;

  constructor(
    public themeService: ThemeService,
    public burgerMenuService: BurgerServiceService,
    public animeService: JikanService,
    private router: Router,
    private cookieService: CookieServiceService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn();
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
      this.authChecked = true;
      this.isUserAuthenticated = true;
      return true;
    }
    this.authChecked = true;
    this.isUserAuthenticated = false;
    return false;
  }

  onSearch() {
    this.animeService.Search(this.searchQuery);
    this.animeService.searchInput.set(this.searchQuery);
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
  }

  toggleMenu() {
    this.burgerMenuService.toggleMenu();
  }
}
