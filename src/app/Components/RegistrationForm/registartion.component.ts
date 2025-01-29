import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'Registration-Form',
  templateUrl: 'registration.component.html',
  styleUrl: 'registration.component.scss',
  imports: [CommonModule],
})
export class RegistrationForm {
  constructor(public themeService: ThemeService) {}
}
