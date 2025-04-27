import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';
import {
  BackendService,
  RegisterUserBody,
} from '../../../services/backend.service';
import { ThemeService } from '../../../services/theme.service';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
export class RegisterComponent {
  constructor(
    private backendService: BackendService,
    public themeService: ThemeService,
    private toastr: ToastrService
  ) {}

  usernameInput: string = '';
  emailInput: string = '';
  passwordInput: string = '';

  validateUsername(username: string): boolean {
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    return (
      usernamePattern.test(username) &&
      username.length >= 3 &&
      username.length <= 20
    );
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email) && email.length <= 50;
  }

  validatePassword(password: string): boolean {
    const passwordPattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordPattern.test(password);
  }

  registerFunc() {
    if (!this.validateUsername(this.usernameInput)) {
      this.toastr.error('invalid username input.', 'Error');
      return;
    }
    if (!this.validateEmail(this.emailInput)) {
      this.toastr.error('invalid email input.', 'Error');
      return;
    }
    if (!this.validatePassword(this.passwordInput)) {
      this.toastr.error('invalid password input.', 'Error');
      return;
    }
    const registerRequestBody: RegisterUserBody = {
      username: this.usernameInput,
      email: this.emailInput,
      password: this.passwordInput,
    };

    this.backendService.register(registerRequestBody).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success('Registration successful!', 'Success');
      },
      error: (error) => {
        this.toastr.error('Registration failed. Please try again.', 'Error');
        console.error('Register error:', error);
      },
    });
  }
}
