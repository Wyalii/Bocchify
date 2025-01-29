import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
@Component({
  selector: 'Theme-Button',
  templateUrl: './ThemeBtn.component.html',
  styleUrl: './ThemeBtn.component.scss',
  imports: [CommonModule],
  standalone: true,
})
export class ThemeBtn {
  constructor(public themeService: ThemeService) {}
}
