import { Routes } from '@angular/router';
import { MainComponent } from './Components/pages/main/main.component';
import { loginGuardGuard } from './guards/login-guard.guard';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'anime/:id',
    title: 'AnimeDetails',
    loadComponent: () =>
      import('./Components/pages/anime-details/anime-details.component').then(
        (m) => m.AnimeDetailsComponent
      ),
  },
  {
    path: 'manga/:id',
    title: 'MangaDetails',
    loadComponent: () =>
      import('./Components/pages/manga-details/manga-details.component').then(
        (m) => m.MangaDetailsComponent
      ),
  },
  {
    path: 'profile/:username',
    loadComponent: () =>
      import('./Components/pages/profile-page/profile-page.component').then(
        (m) => m.ProfilePageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./Components/pages/search-results/search-results.component').then(
        (m) => m.SearchResultsComponent
      ),
  },
  {
    path: 'topAnimes',
    loadComponent: () =>
      import('./Components/pages/top-anime-list/top-anime-list.component').then(
        (m) => m.TopAnimeListComponent
      ),
  },
  {
    path: 'topMangas',
    loadComponent: () =>
      import('./Components/pages/top-manga-list/top-manga-list.component').then(
        (m) => m.TopMangaListComponent
      ),
  },
  {
    path: 'animeSearch',
    loadComponent: () =>
      import('./Components/pages/anime-search/anime-search.component').then(
        (m) => m.AnimeSearchComponent
      ),
  },
  {
    path: 'mangaSearch',
    loadComponent: () =>
      import('./Components/pages/manga-search/manga-search.component').then(
        (m) => m.MangaSearchComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./Components/pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./Components/pages/login/login.component').then(
        (m) => m.LoginComponent
      ),
    canActivate: [loginGuardGuard],
  },
  {
    path: 'verified-success',
    loadComponent: () =>
      import(
        './Components/pages/verified-success/verified-success.component'
      ).then((m) => m.VerifiedSuccessComponent),
  },
];
