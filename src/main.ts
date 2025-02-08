import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { AuthPageComponent } from './app/pages/auth-page/auth-page.component';
import { authGuard } from './app/guards/auth.guard';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {
    path: 'auth-page',
    component: AuthPageComponent,
    canActivate: [authGuard],
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
  ],
}).catch;
