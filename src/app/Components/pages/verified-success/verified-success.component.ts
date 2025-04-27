import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-verified-success',
  imports: [FormsModule, CommonModule],
  templateUrl: './verified-success.component.html',
  styleUrl: './verified-success.component.scss',
})
export class VerifiedSuccessComponent {
  constructor(public themeService: ThemeService) {}
}
