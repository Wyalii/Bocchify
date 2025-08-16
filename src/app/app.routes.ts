import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { RegisterPage } from './pages/register-page/register-page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
];
