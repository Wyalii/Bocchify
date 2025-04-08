import { Component, effect } from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { ThemeService } from '../../services/theme.service';
import { BurgerServiceService } from '../../services/burger-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-burger-menu',
  imports: [ThemeBtn, CommonModule],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss',
})
export class BurgerMenuComponent {
  slideClass: string = 'slide-right';

  constructor(
    public themeService: ThemeService,
    public burgerMenuService: BurgerServiceService
  ) {}
  handleAnimation() {
    this.slideClass =
      this.slideClass == 'slide-left' ? 'slide-right' : 'slide-left';
  }
}
