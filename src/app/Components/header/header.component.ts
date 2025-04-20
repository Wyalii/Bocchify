import { Component, effect, Injectable, Input, Renderer2 } from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { BurgerServiceService } from '../../services/burger-service.service';
import { FormsModule } from '@angular/forms';
import { JikanService } from '../../services/jikan.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-header',
  imports: [ThemeBtn, CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  slideClass: string = 'slide-right';
  private previousTheme: string = '';
  private themeOrder = ['bocchi', 'ryo', 'nikija', 'ikuyo'];

  constructor(
    public themeService: ThemeService,
    public burgerMenuService: BurgerServiceService,
    public animeService: JikanService,
    private router: Router
  ) {
    this.previousTheme = themeService.themeSignal();
  }

  handleAnimation() {
    this.slideClass =
      this.slideClass == 'slide-left' ? 'slide-right' : 'slide-left';
  }

  searchQuery: string = '';

  onSearch() {
    this.animeService.Search(this.searchQuery);
    this.animeService.searchInput.set(this.searchQuery);
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
  }

  toggleMenu() {
    this.burgerMenuService.toggleMenu();
  }
}
