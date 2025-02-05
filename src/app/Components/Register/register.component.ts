import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'Register',
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.scss',
  imports: [CommonModule],
})
export class Register {
  constructor(public themeService: ThemeService, private http: HttpClient) {}
  private apiUrl = 'http://localhost:5227/api/Auth/register';
  register(username: string, password: string) {
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
