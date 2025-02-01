import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { Register } from '../Register/register.component';

@Component({
  selector: 'Form',
  templateUrl: 'form.component.html',
  styleUrl: 'form.component.scss',
  imports: [CommonModule, Register],
})
export class Form {
  isRegistering: boolean = false;
  isLogin: boolean = false;
  constructor(public themeService: ThemeService) {}

  toggleRegister() {
    this.isLogin = false;
    this.isRegistering = true;
  }

  toggleLogin() {
    this.isRegistering = false;
    this.isLogin = true;
  }

  resetForm() {
    this.isRegistering = false;
    this.isLogin = false;
  }
}
