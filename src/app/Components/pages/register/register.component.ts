import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';
import { BackendService } from '../../../services/backend.service';
import { ThemeService } from '../../../services/theme.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ImageUploadService } from '../../../services/image-upload.service';
import { RegisterUserBodyInterface } from '../../../interfaces/register-user-body-interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
export class RegisterComponent {
  constructor(
    private backendService: BackendService,
    public themeService: ThemeService,
    private toastr: ToastrService,
    private router: Router,
    private imageUploadService: ImageUploadService
  ) {}

  isLoading: boolean = false;
  usernameInput: string = '';
  emailInput: string = '';
  passwordInput: string = '';
  selectedImage: string = '';
  fileToUpload: File | null = null;

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
    if (password.length < 5) {
      this.isLoading = false;
      this.toastr.error(
        'password must contain more than 5 characters.',
        'error'
      );
      return false;
    }
    this.isLoading = false;
    return true;
  }

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = URL.createObjectURL(file);
      this.fileToUpload = file;
    }
  }

  registerFunc() {
    this.isLoading = true;
    let profileImageUrl: string | null = null;

    if (!this.validateUsername(this.usernameInput)) {
      this.isLoading = false;
      this.toastr.error('invalid username input.', 'Error');
      return;
    }
    if (!this.validateEmail(this.emailInput)) {
      this.isLoading = false;
      this.toastr.error('invalid email input.', 'Error');
      return;
    }
    if (!this.validatePassword(this.passwordInput)) {
      this.isLoading = false;
      this.toastr.error('invalid password input.', 'Error');
      return;
    }
    if (this.fileToUpload) {
      this.imageUploadService.uploadImage(this.fileToUpload).subscribe({
        next: (response) => {
          profileImageUrl = response.secure_url;
          const registerRequestBody: RegisterUserBodyInterface = {
            username: this.usernameInput,
            email: this.emailInput,
            password: this.passwordInput,
            profileImage: profileImageUrl,
          };
          this.backendService.register(registerRequestBody).subscribe({
            next: (response) => {
              this.toastr.success('Registration successful!', 'Success');
              this.isLoading = false;
              this.router.navigate(['/login']);
            },
            error: (error) => {
              this.toastr.error(
                'Registration failed. Please try again.',
                'Error'
              );
              this.isLoading = false;
              console.error('Register error:', error);
            },
          });
        },
        error: (error) => {
          this.toastr.error('Image upload failed. Please try again.', 'Error');
          this.isLoading = false;
          console.error('Image upload error:', error);
        },
      });
    } else {
      const defaultImageUrl = '/Pfp.jpeg';
      const registerRequestBody: RegisterUserBodyInterface = {
        username: this.usernameInput,
        email: this.emailInput,
        password: this.passwordInput,
        profileImage: defaultImageUrl,
      };
      this.backendService.register(registerRequestBody).subscribe({
        next: (response) => {
          this.toastr.success('Registration successful!', 'Success');
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.toastr.error('Registration failed. Please try again.', 'Error');
          this.isLoading = false;
          console.error('Register error:', error);
        },
      });
    }
  }
}
