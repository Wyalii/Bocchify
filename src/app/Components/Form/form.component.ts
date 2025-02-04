import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { Register } from '../Register/register.component';
import { Login } from '../Login/login.component';

@Component({
  selector: 'Form',
  templateUrl: 'form.component.html',
  styleUrl: 'form.component.scss',
  imports: [CommonModule, Register, Login],
})
export class Form {
  isRegistering: boolean = false;
  isLogin: boolean = true;
  constructor(public themeService: ThemeService) {}

  toggleRegister() {
    this.isLogin = false;
    this.isRegistering = true;
  }

  toggleLogin() {
    this.isRegistering = false;
    this.isLogin = true;
  }

  handleGoBack() {
    this.isLogin = false;
    this.isRegistering = false;
  }
}
