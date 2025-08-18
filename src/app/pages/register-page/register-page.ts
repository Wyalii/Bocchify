import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ThemeControlComponent } from '../../components/theme-control-component/theme-control-component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  router: Router = inject(Router);
  selectedImage: any;
  themeService: ThemeService = inject(ThemeService);
  isPixelArt = this.themeService.pixelMode;
  currentTheme = this.themeService.theme;
  registrationForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    profilePicture: new FormControl(''),
  });

  closeModal() {
    this.themeService.toggleModal();
    this.router.navigate(['/']);
  }
  onImageSelect($event: Event) {
    throw new Error('Method not implemented.');
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
