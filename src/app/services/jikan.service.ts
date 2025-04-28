import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, delay, finalize, map, of, throwError } from 'rxjs';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class JikanService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private cacheService: CacheService
  ) {}

  animeSearchResults: any = {};
  mangaSearchResults: any = {};
  isLoadingAnimes = signal(false);
  isLoadingMangas = signal(false);
  searchInput = signal<string>('');

  Search(search: string) {
    this.AnimeSearch(search, 1).subscribe();
    this.MangaSearch(search, 1).subscribe();
  }

  AnimeSearch(search: string, page: number) {
    this.isLoadingAnimes.set(true);
    let url = `https://api.jikan.moe/v4/anime?q=${search}&page=${page}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log('anime search result:', response);
        this.animeSearchResults = response;
        return this.animeSearchResults;
      }),
      catchError((err) => {
        this.toastr.error('Failed to fetch anime search results.', 'Error');
        console.error('Anime Search Error:', err);
        return throwError(() => err);
      }),
      finalize(() => {
        this.isLoadingAnimes.set(false);
      })
    );
  }

  MangaSearch(search: string, page: number) {
    this.isLoadingMangas.set(true);
    let url = `https://api.jikan.moe/v4/manga?q=${search}&page=${page}`;
    return this.http.get<any>(url).pipe(
      delay(1000),
      map((response) => {
        console.log(' manga search result:', response);
        this.mangaSearchResults = response;
        return this.mangaSearchResults;
      }),
      catchError((err) => {
        this.toastr.error('Failed to fetch manga search results.', 'Error');
        console.error('Manga Search Error:', err);
        return throwError(() => err);
      }),
      finalize(() => {
        this.isLoadingMangas.set(false);
      })
    );
  }

  getTopAnimes(page: number = 1) {
    const cacheKey = `top-animes-page-${page}`;
    const cached = this.cacheService.get(cacheKey);

    if (cached) {
      return of(cached);
    }
    this.isLoadingAnimes.set(true);
    const url = `https://api.jikan.moe/v4/top/anime?page=${page}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        const result = {
          data: response.data,
          pagination: response.pagination,
        };
        this.cacheService.set(cacheKey, result, 5 * 60 * 1000);
        return result;
      }),
      catchError((err) => {
        this.toastr.error('Failed to fetch top animes.', 'Error');
        console.error('Top Animes Error:', err);
        return throwError(() => err);
      }),
      finalize(() => this.isLoadingAnimes.set(false))
    );
  }

  getTopMangas(page: number = 1) {
    const cacheKey = `top-mangas-page-${page}`;
    const cached = this.cacheService.get(cacheKey);

    if (cached) {
      return of(cached);
    }
    this.isLoadingMangas.set(true);
    const url = `https://api.jikan.moe/v4/top/manga?page=${page}`;
    return this.http.get<any>(url).pipe(
      delay(1000),
      map((response) => {
        const result = {
          data: response.data,
          pagination: response.pagination,
        };
        this.cacheService.set(cacheKey, result, 5 * 60 * 1000);
        return result;
      }),
      catchError((err) => {
        this.toastr.error('Failed to fetch top mangas.', 'Error');
        console.error('Top Mangas Error:', err);
        return throwError(() => err);
      }),
      finalize(() => this.isLoadingMangas.set(false))
    );
  }

  getAnimeDetails(id: string) {
    let url = `https://api.jikan.moe/v4/anime/${id}/full`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log('Anime Details', response);
        return response.data;
      }),
      catchError((err) => {
        this.toastr.error('Failed to load anime details.', 'Error');
        console.error('Anime Details Error:', err);
        return throwError(() => err);
      })
    );
  }

  getMangaDetails(id: string) {
    let url = `https://api.jikan.moe/v4/manga/${id}/full`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log('Manga Details', response);
        return response.data;
      }),
      catchError((err) => {
        this.toastr.error('Failed to load manga details.', 'Error');
        console.error('Manga Details Error:', err);
        return throwError(() => err);
      })
    );
  }
}
