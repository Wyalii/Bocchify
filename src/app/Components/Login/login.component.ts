import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ThemeService } from '../../services/theme.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
interface AuthResponse {
  message: string;
  token: string;
}

@Component({
  selector: 'Login',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
  imports: [CommonModule, HttpClientModule],
})
export class Login {
  constructor(
    public themeService: ThemeService,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  private apiUrl = 'http://localhost:5227/api/Auth/login';
  login(username: string, password: string) {
    const requestBody = { username, password };
    this.http.post<AuthResponse>(this.apiUrl, requestBody).subscribe({
      next: (response) => {
        if (response.token !== undefined && response.token !== null) {
          this.cookieService.set('token', response.token, undefined, '/');
          this.router.navigate(['/']);
          window.location.reload();
        }
      },
      error: (response) => {
        console.log('failed:', response);
      },
    });
  }
}
