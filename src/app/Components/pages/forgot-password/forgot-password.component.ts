import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';
import { BackendService } from '../../../services/backend.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  constructor(
    public themeService: ThemeService,
    private backendService: BackendService,
    private toastr: ToastrService
  ) {}
  isLoading: boolean = false;
  email: string = '';
  sendPasswordChangeRequest() {
    this.isLoading = true;
    this.backendService.forgotPassword(this.email).subscribe(
      (response) => {
        this.toastr.success(`${response.message}`);
        this.isLoading = false;
      },
      (error) => {
        this.toastr.error(`${error.error.message}`);
        this.isLoading = false;
      }
    );
  }
}
