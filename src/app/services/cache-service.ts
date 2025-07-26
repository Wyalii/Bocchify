import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor() {
    this.loadLocalStorage();
  }
  private cachedTopAnimes = new Map<number, any>();
  private cachedTopMangas = new Map<number, any>();
  private saveToLocalStorage() {
    localStorage.setItem(
      'cachedTopAnimes',
      JSON.stringify(Object.fromEntries(this.cachedTopAnimes))
    );
    localStorage.setItem(
      'cachedTopMangas',
      JSON.stringify(Object.fromEntries(this.cachedTopMangas))
    );
  }

  private loadLocalStorage() {
    const animeData = localStorage.getItem('cachedTopAnimes');
    const mangaData = localStorage.getItem('cachedTopMangas');
    if (animeData) {
      this.cachedTopAnimes = new Map<number, any>(
        Object.entries(JSON.parse(animeData)).map(([k, v]) => [Number(k), v])
      );
    }

    if (mangaData) {
      this.cachedTopMangas = new Map<number, any>(
        Object.entries(JSON.parse(mangaData)).map(([k, v]) => [Number(k), v])
      );
    }
  }
  getTopCachedAnimes() {
    return this.cachedTopAnimes;
  }

  setTopAnimePage(page: number, data: any) {
    this.cachedTopAnimes.set(page, data);
    this.saveToLocalStorage();
  }

  hasTopAnimePage(page: number) {
    return this.cachedTopAnimes.has(page);
  }

  getTopCachedMangas() {
    return this.cachedTopMangas;
  }

  setTopMangaPage(page: number, data: any) {
    this.cachedTopMangas.set(page, data);
    this.saveToLocalStorage();
  }

  hasTopMangaPage(page: number) {
    return this.cachedTopMangas.has(page);
  }
}
