import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  catchError,
  delay,
  finalize,
  from,
  map,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { CacheService } from './cache.service';
import { BackendService } from './backend.service';
import { CookieServiceService } from './cookie-service.service';

@Injectable({
  providedIn: 'root',
})
export class JikanService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private cacheService: CacheService,
    private backendService: BackendService,
    private cookieService: CookieServiceService
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
      map((response) => {
        const result = {
          data: response.data,
          pagination: response.pagination,
        };
        this.cacheService.set(cacheKey, result, 5 * 60 * 1000);
        return result;
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
      finalize(() => this.isLoadingMangas.set(false))
    );
  }
  getAnimeDetails(id: string) {
    const token = this.cookieService.getToken();
    const url = `https://api.jikan.moe/v4/anime/${id}/full`;
    if (token) {
      return this.http.get<any>(url).pipe(
        switchMap((response) =>
          from(this.backendService.checkFavourite(id, token)).pipe(
            map((isFavourited) => {
              console.log(
                'Anime Details',
                response.data,
                'Is Favourite:',
                isFavourited
              );
              return {
                data: response.data,
                isFavourited: isFavourited.isFavourited,
              };
            })
          )
        ),
        catchError((err) => {
          this.toastr.error('Failed to load anime details.', 'Error');
          console.error('Anime Details Error:', err);
          return throwError(() => err);
        })
      );
    } else {
      return this.http.get<any>(url).pipe(
        map((response) => {
          console.log('log from jikan service:', response);
          return response;
        }),
        catchError((err) => {
          this.toastr.error('Failed to load anime details.', 'Error');
          console.error('Anime Details Error:', err);
          return throwError(() => err);
        })
      );
    }
  }

  getMangaDetails(id: string) {
    const token = this.cookieService.getToken();
    const url = `https://api.jikan.moe/v4/manga/${id}/full`;
    if (token) {
      return this.http.get<any>(url).pipe(
        switchMap((response) =>
          from(this.backendService.checkFavourite(id, token)).pipe(
            map((isFavourited) => {
              console.log(
                'Manga Details',
                response.data,
                'Is Favourite:',
                isFavourited
              );
              return {
                data: response.data,
                isFavourited: isFavourited.isFavourited,
              };
            })
          )
        ),
        catchError((err) => {
          this.toastr.error('Failed to load manga details.', 'Error');
          console.error('Manga Details Error:', err);
          return throwError(() => err);
        })
      );
    } else {
      return this.http.get<any>(url).pipe(
        map((response) => {
          return {
            data: response.data,
            isFavourited: false,
          };
        }),
        catchError((err) => {
          this.toastr.error('Failed to load manga details.', 'Error');
          console.error('Manga Details Error:', err);
          return throwError(() => err);
        })
      );
    }
  }
}
