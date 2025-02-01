import { Component, ViewEncapsulation, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeBtn } from './Components/ThemeBtn/ThemeBtn.component';
import { Form } from './Components/Form/form.component';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeBtn, CommonModule, Form],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'Bocchify';
  constructor(public themeService: ThemeService) {}
}
