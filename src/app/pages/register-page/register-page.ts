import { Component, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BocchifyApiService } from '../../services/bocchify-api-service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  errorMessage: string = '';
  isRegistering: boolean = false;
  snackBar: MatSnackBar = inject(MatSnackBar);
  bocchifyApiService: BocchifyApiService = inject(BocchifyApiService);
  router: Router = inject(Router);
  selectedImage = signal<string>('');
  themeService: ThemeService = inject(ThemeService);
  isPixelArt = this.themeService.pixelMode;
  currentTheme = this.themeService.theme;
  registrationForm = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      profilePicture: new FormControl(''),
    },
    { validators: this.passwordMatchValidator }
  );

  closeModal() {
    this.themeService.toggleModal();
    this.router.navigate(['/']);
  }
  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(event);
    console.log(event.target);
    console.log(input);
    if (input.files && input.files[0]) {
      const file = input.files[0];
      console.log(file);

      if (!file.type.startsWith('image/')) {
        console.log('please select image');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        console.log('image size is over 5mb');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedImage.set(e.target?.result as string);
        console.log(this.selectedImage());
      };
      reader.readAsDataURL(file);

      this.registrationForm.patchValue({
        profilePicture: file.name,
      });
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  registerUser() {
    if (this.registrationForm.invalid) {
      return;
    }
    this.isRegistering = true;
    const formData = this.registrationForm.value;
    const registrationRequest = {
      Username: formData.username!,
      Email: formData.email!,
      Password: formData.password!,
      Avatar: formData.profilePicture!,
    };
    this.bocchifyApiService.registration(registrationRequest).subscribe({
      next: (res: any) => {
        this.snackBar.open('Success', 'Close', { duration: 3000 });
        console.log(res);
        this.isRegistering = false;
      },
      error: (err: any) => {
        this.snackBar.open(err.error.message, 'Close', { duration: 3000 });
        console.log(err);
        this.isRegistering = false;
      },
    });
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    if (password && password.length < 6) {
      return { passwordTooShort: true };
    }

    if (password !== confirm) {
      return { passwordMismatch: true };
    }
    return null;
  }
  get passwordMismatch() {
    return this.registrationForm.errors?.['passwordMismatch'];
  }
  get passwordLength() {
    return this.registrationForm.errors?.['passwordTooShort'];
  }
}
