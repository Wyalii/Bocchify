import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { BackendService } from '../../../services/backend.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { UpdateProfileRequestInterface } from '../../../interfaces/update-profile-request-interface';
import { ActivatedRoute } from '@angular/router';

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
    private route: ActivatedRoute
  ) {}
  newPassword: string = '';
  newPasswordRetry: string = '';
  errorTextMessage: string = '';
  email: string = '';
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }

  checkPasswordMatch() {
    if (this.newPassword != this.newPasswordRetry) {
      this.errorTextMessage = "Passwords Doesn't Match.";
      console.log(this.errorTextMessage);
      return false;
    }
    this.errorTextMessage = '';
    console.log(this.errorTextMessage);
    return true;
  }

  resetPassword() {
    if (!this.checkPasswordMatch()) {
      return;
    }
    console.log(this.email);
    this.backendService.resetPassword(this.email, this.newPassword).subscribe(
      (response) => {
        this.toastr.success(`${response.message}`, 'Success');
      },
      (error) => {
        this.toastr.error(`${error.message}`, 'Error');
      }
    );
  }
}
