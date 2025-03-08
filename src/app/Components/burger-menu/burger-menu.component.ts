import { Component } from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { ThemeService } from '../../services/theme.service';
import { BurgerServiceService } from '../../services/burger-service.service';

@Component({
  selector: 'app-burger-menu',
  imports: [ThemeBtn],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss',
})
export class BurgerMenuComponent {
  constructor(
    public themeService: ThemeService,
    public burgerMenuService: BurgerServiceService
  ) {}
}
