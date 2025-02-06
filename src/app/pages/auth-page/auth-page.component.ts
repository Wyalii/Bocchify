import { Component } from '@angular/core';
import { ThemeBtn } from '../../Components/ThemeBtn/ThemeBtn.component';
import { Form } from '../../Components/Form/form.component';

@Component({
  selector: 'app-auth-page',
  imports: [ThemeBtn, Form],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  themeService: any;
}
