import { Routes } from '@angular/router';
import { MainComponent } from './Components/pages/main/main.component';
import { AnimeDetailsComponent } from './Components/pages/anime-details/anime-details.component';
import { MangaDetailsComponent } from './Components/pages/manga-details/manga-details.component';
import { SearchResultsComponent } from './Components/pages/search-results/search-results.component';
import { TopAnimeListComponent } from './Components/pages/top-anime-list/top-anime-list.component';
import { TopMangaListComponent } from './Components/pages/top-manga-list/top-manga-list.component';
import { AnimeSearchComponent } from './Components/pages/anime-search/anime-search.component';

export const routes: Routes = [
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'anime/:id',
    title: 'AnimeDetails',
    component: AnimeDetailsComponent,
  },
  {
    path: 'manga/:id',
    title: 'MangaDetails',
    component: MangaDetailsComponent,
  },
  {
    path: 'search',
    component: SearchResultsComponent,
  },
  {
    path: 'topAnimes',
    component: TopAnimeListComponent,
  },
  {
    path: 'topMangas',
    component: TopMangaListComponent,
  },
  {
    path: 'animeSearch',
    component: AnimeSearchComponent,
  },
];
