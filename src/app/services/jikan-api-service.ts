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
  animeSearchResults: any;
  mangaSearchResults: any;
  searchQuery = signal<string>('');
  Search(search: string) {
    this.AnimeSearch(search, 1).subscribe();
    this.MangaSearch(search, 1).subscribe();
  }

  AnimeSearch(search: string, page: number) {
    this.searchQuery.set(search);
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
    this.searchQuery.set(search);
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

  getAnimeDetails(id: string) {
    // const token = this.cookieService.getToken();
    const url = `https://api.jikan.moe/v4/anime/${id}/full`;
    // if (token) {
    //   return this.http.get<any>(url).pipe(
    //     switchMap((response) =>
    //       from(this.backendService.checkFavourite(id, token)).pipe(
    //         map((isFavourited) => {
    //           return {
    //             data: response.data,
    //             isFavourited: isFavourited.isFavourited,
    //           };
    //         })
    //       )
    //     ),
    //     catchError((err) => {
    //       this.toastr.error('Failed to load anime details.', 'Error');
    //       console.error('Anime Details Error:', err);
    //       return throwError(() => err);
    //     })
    //   );
    // } else {
    return this.http.get<any>(url).pipe(
      map((response) => {
        return response;
      }),
      catchError((err) => {
        console.error('Anime Details Error:', err);
        return throwError(() => err);
      })
    );
  }

  getMangaDetails(id: string) {
    // const token = this.cookieService.getToken();
    const url = `https://api.jikan.moe/v4/manga/${id}/full`;
    // if (token) {
    //   return this.http.get<any>(url).pipe(
    //     switchMap((response) =>
    //       from(this.backendService.checkFavourite(id, token)).pipe(
    //         map((isFavourited) => {
    //           return {
    //             data: response.data,
    //             isFavourited: isFavourited.isFavourited,
    //           };
    //         })
    //       )
    //     ),
    //     catchError((err) => {
    //       this.toastr.error('Failed to load manga details.', 'Error');
    //       console.error('Manga Details Error:', err);
    //       return throwError(() => err);
    //     })
    //   );
    // } else {
    return this.http.get<any>(url).pipe(
      map((response) => {
        return {
          data: response.data,
          isFavourited: false,
        };
      }),
      catchError((err) => {
        // this.toastr.error('Failed to load manga details.', 'Error');
        console.error('Manga Details Error:', err);
        return throwError(() => err);
      })
    );
  }
}
