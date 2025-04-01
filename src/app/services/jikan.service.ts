import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { delay, finalize, map } from 'rxjs';
interface Manga {
  rank: number;
}
@Injectable({
  providedIn: 'root',
})
export class JikanService {
  constructor(private http: HttpClient) {}
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
      finalize(() => {
        this.isLoadingAnimes.set(false);
      })
    );
  }

  MangaSearch(search: string, page: number) {
    this.isLoadingMangas.set(true);
    let url = `https://api.jikan.moe/v4/manga?q=${search}`;
    return this.http.get<any>(url).pipe(
      delay(1000),
      map((response) => {
        console.log(' manga search result:', response);
        this.mangaSearchResults = response;
        return this.mangaSearchResults;
      }),
      finalize(() => {
        this.isLoadingMangas.set(false);
      })
    );
  }

  getTopAnimes(page: number = 1) {
    this.isLoadingAnimes.set(true);
    const url = `https://api.jikan.moe/v4/top/anime?page=${page}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
      }),
      finalize(() => this.isLoadingAnimes.set(false))
    );
  }

  getTopMangas(page: number = 1) {
    this.isLoadingMangas.set(true);
    const url = `https://api.jikan.moe/v4/top/manga?page=${page}`;
    return this.http.get<any>(url).pipe(
      delay(1000),
      map((response) => {
        return {
          data: response.data,
          pagination: response.pagination,
        };
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
      })
    );
  }

  getMangaDetails(id: string) {
    let url = `https://api.jikan.moe/v4/manga/${id}/full`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log('Anime Details', response);
        return response.data;
      })
    );
  }
}
