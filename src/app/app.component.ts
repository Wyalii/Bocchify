import {
  Component,
  ViewEncapsulation,
  inject,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'Bocchify';
  cookieService = inject(CookieService);
  constructor(public themeService: ThemeService) {}
}
