import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class YoutubeServiceService {
  constructor(private http: HttpClient) {}
  BleachOpenings: any[] = [];
  nextPageTokenBleach: string = '';
  apiKey: string = environment.youtubeApiKey;
  getBleachOpenings(playlistId: string): void {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${this.apiKey}`;
    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.BleachOpenings = data.items;
        console.log(this.BleachOpenings);
      },
      error: (error) => {
        console.error('Error fetching Bleach openings:', error);
      },
    });
  }
}
