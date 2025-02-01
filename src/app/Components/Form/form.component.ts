import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Form',
  templateUrl: 'form.component.html',
  styleUrl: 'form.component.scss',
  imports: [CommonModule],
})
export class Form {
  constructor(public themeService: ThemeService) {}
}
