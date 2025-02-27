import { Routes } from '@angular/router';
import { AnimeDetailsComponent } from './Components/anime-details/anime-details.component';
import { MainComponent } from './Components/main/main.component';
import { MangaDetailsComponent } from './Components/manga-details/manga-details.component';

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
];
