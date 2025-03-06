import { Component, Input } from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { BurgerServiceService } from '../../services/burger-service.service';

@Component({
  selector: 'app-header',
  imports: [ThemeBtn, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    public themeService: ThemeService,
    public burgerMenuService: BurgerServiceService
  ) {}

  toggleMenu() {
    this.burgerMenuService.toggleMenu();
  }
}
