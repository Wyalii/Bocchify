import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cachedTopAnimes = new Map<number, any>();
  private cachedTopMangas = new Map<number, any>();

  getTopCachedAnimes() {
    return this.cachedTopAnimes;
  }

  setTopAnimePage(page: number, data: any) {
    this.cachedTopAnimes.set(page, data);
  }

  hasTopAnimePage(page: number) {
    return this.cachedTopAnimes.has(page);
  }

  getTopCachedMangas() {
    return this.cachedTopMangas;
  }

  setTopMangaPage(page: number, data: any) {
    this.cachedTopMangas.set(page, data);
  }

  hasTopMangaPage(page: number) {
    return this.cachedTopMangas.has(page);
  }
}
