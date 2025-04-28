import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache: Map<string, { data: any; expiry: number }> = new Map();

  constructor() {}

  set(key: string, data: any, ttl: number = 300000) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { data, expiry });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) {
      return null;
    }

    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear(key: string) {
    this.cache.delete(key);
  }

  clearAll() {
    this.cache.clear();
  }
}
