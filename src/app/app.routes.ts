import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { RegisterPage } from './pages/register-page/register-page';
import { LoginPage } from './pages/login-page/login-page';
import { TopAnimePage } from './pages/top-anime-page/top-anime-page';
import { TopMangaPage } from './pages/top-manga-page/top-manga-page';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'topAnimesPage',
    component: TopAnimePage,
  },
  { path: 'topMangasPage', component: TopMangaPage },
];
