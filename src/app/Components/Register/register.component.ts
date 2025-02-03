import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'Register',
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.scss',
  imports: [CommonModule, HttpClientModule],
})
export class Register {
  private apiUrl = 'http://localhost:5227/api/Auth/register';
  constructor(public themeService: ThemeService, private http: HttpClient) {}
  register(username: string, password: string) {
    console.log(username);
    console.log(password);
    const requestBody = { username, password };
    this.http.post(this.apiUrl, requestBody).subscribe({
      next: (response) => {
        console.log('success:', response);
      },
      error: (response) => {
        console.log('failed:', response);
      },
    });
  }
}
