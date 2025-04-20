import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';
import {
  BackendService,
  LoginUserBody,
} from '../../../services/backend.service';
import { ThemeService } from '../../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        // when component enters
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // when component leaves
        animate('500ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  constructor(
    private backendService: BackendService,
    public themeService: ThemeService,
    private toastr: ToastrService
  ) {}
  emailInput: string = '';
  passwordInput: string = '';

  validatePassword(password: string): boolean {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordPattern.test(password);
  }
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email) && email.length <= 50;
  }

  loginFunc() {
    if (!this.validateEmail(this.emailInput)) {
      this.toastr.error('invalid email input.', 'Error');
      return;
    }
    if (!this.validatePassword(this.passwordInput)) {
      this.toastr.error('invalid password input.', 'Error');
      return;
    }

    const loginRequestBody: LoginUserBody = {
      email: this.emailInput,
      password: this.passwordInput,
    };
    this.backendService.login(loginRequestBody).subscribe({
      next: (response) => {
        this.toastr.success('Registration successful!');
      },
      error: (error) => {
        this.toastr.error('Registration failed. Please try again.', 'Error');
        console.error('Register error:', error);
      },
    });
  }
}
