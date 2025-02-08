import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyServiceService {
  constructor(private http: HttpClient) {}

  getAccessToken(): Observable<any> {
    return this.http.get('http://localhost:5227/api/Spotify/access-token');
  }
}
