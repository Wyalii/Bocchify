import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme-service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BocchifyApiService } from '../../services/bocchify-api-service';
import { LoginRequest } from '../../interfaces/login-request';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  loading: boolean = false;
  bocchifyApiService: BocchifyApiService = inject(BocchifyApiService);
  router: Router = inject(Router);
  selectedImage: any;
  themeService: ThemeService = inject(ThemeService);
  isPixelArt = this.themeService.pixelMode;
  currentTheme = this.themeService.theme;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });
  snackBar: MatSnackBar = inject(MatSnackBar);
  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    const formData = this.loginForm.value;
    const loginUserRequest: LoginRequest = {
      Email: formData.email!,
      Password: formData.password!,
    };
    this.bocchifyApiService.login(loginUserRequest).subscribe({
      next: (res) => {
        console.log(res);
        this.loading = false;
        this.snackBar.open('Success', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.snackBar.open(err.error.message, 'Close', { duration: 3000 });
      },
    });
  }
  closeModal() {
    this.themeService.toggleModal();
    this.router.navigate(['/']);
  }
  onImageSelect($event: Event) {
    throw new Error('Method not implemented.');
  }
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
