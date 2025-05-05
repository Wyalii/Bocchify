import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';
import { BackendService } from '../../../services/backend.service';
import { ThemeService } from '../../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CookieServiceService } from '../../../services/cookie-service.service';
import { UserService } from '../../../services/user.service';
import { LoginUserInterface } from '../../../interfaces/login-user-interface';
@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('500ms ease-out', style({ opacity: 0 }))]),
    ]),
  ],
})
export class LoginComponent {
  constructor(
    private backendService: BackendService,
    public themeService: ThemeService,
    private toastr: ToastrService,
    private router: Router,
    private cookieService: CookieServiceService,
    private userService: UserService
  ) {}
  emailInput: string = '';
  passwordInput: string = '';
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return emailPattern.test(email) && email.length <= 50;
  }

  loginFunc() {
    if (!this.validateEmail(this.emailInput)) {
      this.toastr.error('invalid email input.', 'Error');
      return;
    }

    const loginRequestBody: LoginUserInterface = {
      email: this.emailInput,
      password: this.passwordInput,
    };
    this.backendService.login(loginRequestBody).subscribe({
      next: (response) => {
        console.log(response);
        this.toastr.success(`${response.message}`);
        this.cookieService.setToken(response.newToken);
        this.userService.setUser(response.name, response.profileImage);
      },
      error: (error) => {
        this.toastr.error(`${error.error.message}`, 'Error');
        console.error('Register error:', error);
      },
    });
  }
}
