import { Component } from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [ThemeBtn, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(public themeService: ThemeService) {}
}
