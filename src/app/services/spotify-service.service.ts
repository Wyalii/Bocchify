import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyServiceService {
  constructor(private http: HttpClient) {}

  getPlaylistsByName(playlistName: string): Observable<any> {
    return this.http.post(
      'http://localhost:5227/api/Spotify/get-playlists',
      JSON.stringify(playlistName),
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
