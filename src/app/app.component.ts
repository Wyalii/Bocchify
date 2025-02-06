import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeBtn } from './Components/ThemeBtn/ThemeBtn.component';
import { Form } from './Components/Form/form.component';
import { ThemeService } from './services/theme.service';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { LandingComponent } from './Components/landing/landing.component';
import { HeaderComponent } from './Components/header/header.component';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ThemeBtn,
    CommonModule,
    Form,
    LandingComponent,
    HeaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.5s ease-in-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'Bocchify';
  currentRoute: string = '';

  constructor(public themeService: ThemeService, private router: Router) {}
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      this.currentRoute = this.router.url;
      console.log(this.currentRoute);
    });
  }
}
