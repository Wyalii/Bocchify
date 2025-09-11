import { Routes } from '@angular/router';
import { LandingPage } from './pages/landing-page/landing-page';
import { TopAnimePage } from './pages/top-anime-page/top-anime-page';
import { TopMangaPage } from './pages/top-manga-page/top-manga-page';
import { AnimeSearch } from './pages/anime-search/anime-search';
import { MangaSearch } from './pages/manga-search/manga-search';
import { AnimeDetails } from './pages/anime-details/anime-details';
import { MangaDetails } from './pages/manga-details/manga-details';

export const routes: Routes = [
  {
    path: '',
    component: LandingPage,
  },

  {
    path: 'topAnimesPage',
    component: TopAnimePage,
  },
  { path: 'topMangasPage', component: TopMangaPage },
  {
    path: 'animeSearchResults',
    component: AnimeSearch,
  },
  {
    path: 'mangaSearchResults',
    component: MangaSearch,
  },
  {
    path: 'anime/:id',
    title: 'AnimeDetails',
    component: AnimeDetails,
  },
  {
    path: 'manga/:id',
    title: 'MangaDetails',
    component: MangaDetails,
  },
];
