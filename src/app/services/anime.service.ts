import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimeService {
  constructor(private http: HttpClient) {}
  getTopAnimes(): Observable<any[]> {
    let url = 'https://api.jikan.moe/v4/top/anime';
    return this.http.get<any>(url).pipe(map((response) => response.data));
  }
}
