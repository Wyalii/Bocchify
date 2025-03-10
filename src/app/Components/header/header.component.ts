import { Component, Injectable, Input } from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { BurgerServiceService } from '../../services/burger-service.service';
import { FormsModule } from '@angular/forms';
import { JikanService } from '../../services/jikan.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-header',
  imports: [ThemeBtn, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    public themeService: ThemeService,
    public burgerMenuService: BurgerServiceService,
    public animeService: JikanService,
    private router: Router
  ) {}
  searchQuery: string = '';

  onSearch() {
    this.animeService.Search(this.searchQuery);
    this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
  }

  toggleMenu() {
    this.burgerMenuService.toggleMenu();
  }
}
