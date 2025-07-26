import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, throwError } from 'rxjs';
import { CacheService } from './cache-service';

@Injectable({
  providedIn: 'root',
})
export class JikanApiService {
  http: HttpClient = inject(HttpClient);
  cacheService: CacheService = inject(CacheService);
  animeSearchResults = new Map();
  mangaSearchResults = new Map();

  AnimeSearch(search: string, page: number) {
    let url = `https://api.jikan.moe/v4/anime?q=${search}&page=${page}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        this.animeSearchResults = response;
        return this.animeSearchResults;
      }),
      catchError((err) => {
        console.error('Anime Search Error:', err);
        return throwError(() => err);
      })
    );
  }

  MangaSearch(search: string, page: number) {
    let url = `https://api.jikan.moe/v4/manga?q=${search}&page=${page}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        this.mangaSearchResults = response;
        return this.mangaSearchResults;
      }),
      catchError((err) => {
        console.error('Manga Search Error:', err);
        return throwError(() => err);
      })
    );
  }

  getTopAnimes(page: number = 1) {
    if (this.cacheService.hasTopAnimePage(page)) {
      return of(this.cacheService.getTopCachedAnimes());
    }
    const url = `https://api.jikan.moe/v4/top/anime?page=${page}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        this.cacheService.setTopAnimePage(page, response);
        return this.cacheService.getTopCachedAnimes();
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }

  getTopMangas(page: number = 1) {
    if (this.cacheService.hasTopMangaPage(page)) {
      return of(this.cacheService.getTopCachedMangas());
    }
    const url = `https://api.jikan.moe/v4/top/manga?page=${page}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        this.cacheService.setTopMangaPage(page, response);
        return this.cacheService.getTopCachedMangas();
      }),
      catchError((err) => {
        return throwError(() => err);
      })
    );
  }
}
