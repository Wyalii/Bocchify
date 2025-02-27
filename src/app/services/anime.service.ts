import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { delay, finalize, map, Observable } from 'rxjs';
interface Manga {
  rank: number;
}
@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private http: HttpClient) {}
  isLoadingAnimes = signal(false);
  isLoadingMangas = signal(false);

  getTopAnimes(): Observable<any[]> {
    this.isLoadingAnimes.set(true);
    let url = 'https://api.jikan.moe/v4/top/anime';
    return this.http.get<any>(url).pipe(
      delay(1000),
      map((response) => {
        console.log('Anime API Response:', response);
        return response.data;
      }),
      finalize(() => this.isLoadingAnimes.set(false))
    );
  }

  getTopMangas(): Observable<any[]> {
    this.isLoadingMangas.set(true);
    let url = 'https://api.jikan.moe/v4/top/manga';
    return this.http.get<any>(url).pipe(
      delay(1000),
      map((response) => {
        console.log('Manga API Response:', response);
        return response.data;
      }),
      map((mangas: Manga[]) => mangas.sort((a, b) => a.rank - b.rank)),
      finalize(() => this.isLoadingMangas.set(false))
    );
  }

  getAnimeDetails(id: number) {
    let url = `https://api.jikan.moe/v4/anime/${id}/full`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log('Anime Details', response);
        return response.data;
      })
    );
  }
}
