import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../services/theme-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  router: Router = inject(Router);
  selectedImage: any;
  themeService: ThemeService = inject(ThemeService);
  isPixelArt = this.themeService.pixelMode;
  currentTheme = this.themeService.theme;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

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
