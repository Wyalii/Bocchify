import { Component } from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [ThemeBtn],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public themeService: ThemeService) {}
}
