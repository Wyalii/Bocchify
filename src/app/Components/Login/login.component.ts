import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'Login',
  templateUrl: 'login.component.html',
  styleUrl: 'login.component.scss',
  imports: [CommonModule],
})
export class Login {
  login() {
    console.log('login clicked');
  }
}
