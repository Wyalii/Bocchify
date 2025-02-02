import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'Register',
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.scss',
  imports: [CommonModule],
  standalone: true,
})
export class Register {
  constructor(public themeService: ThemeService) {}
}
