import {
  Component,
  effect,
  Injectable,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { BurgerServiceService } from '../../services/burger-service.service';
import { FormsModule } from '@angular/forms';
import { JikanService } from '../../services/jikan.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CookieServiceService } from '../../services/cookie-service.service';

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
  constructor(
    public themeService: ThemeService,
    public burgerMenuService: BurgerServiceService,
    public animeService: JikanService,
    private router: Router,
    private cookieService: CookieServiceService
  ) {}
  ngOnInit(): void {
    this.isLoggedIn();
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
