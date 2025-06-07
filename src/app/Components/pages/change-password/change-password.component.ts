import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../../services/backend.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieServiceService } from '../../../services/cookie-service.service';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  constructor(
    public themeService: ThemeService,
    private backendService: BackendService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieServiceService
  ) {}
  newPassword: string = '';
  newPasswordRetry: string = '';
  errorTextMessage: string = '';
  email: string = '';
  token: string = '';
  isLoading: boolean = false;
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.token = params['token'];
    });
  }

  checkPasswordMatch() {
    if (this.newPassword != this.newPasswordRetry) {
      this.errorTextMessage = "Passwords Doesn't Match.";
      return false;
    }
    this.errorTextMessage = '';
    return true;
  }

  isPasswordValid() {
    if (!this.checkPasswordMatch()) {
      return false;
    }
    if (this.newPassword.length < 4) {
      this.toastr.error(
        'Password must contain more than 4 characters.',
        'Error'
      );
      return false;
    }
    return true;
  }

  resetPassword() {
    this.isLoading = true;
    if (!this.isPasswordValid()) {
      this.isLoading = false;
      return;
    }
    this.backendService
      .resetPassword(this.email, this.token, this.newPassword)
      .subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.success(`${response.message}`, 'Success');
          this.cookieService.deleteToken();
          this.router.navigate(['/login']);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (error) => {
          this.isLoading = false;
          this.toastr.error(`${error.error.message}`, 'Error');
        }
      );
  }
}
