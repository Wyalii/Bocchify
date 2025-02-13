import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyServiceService {
  constructor(private http: HttpClient) {}

  getAlbumsByName(albumName: string): Observable<any> {
    return this.http.post(
      'http://localhost:5227/api/Spotify/get-album',
      JSON.stringify(albumName),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
