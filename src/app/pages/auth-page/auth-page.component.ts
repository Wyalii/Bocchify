import { Component } from '@angular/core';
import { Form } from '../../Components/Form/form.component';

@Component({
  selector: 'app-auth-page',
  imports: [Form],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {
  themeService: any;
}
