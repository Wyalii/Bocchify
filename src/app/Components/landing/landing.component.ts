import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { SpotifyServiceService } from '../../services/spotify-service.service';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

interface Playlist {
  name: string;
  images?: { url: string }[];
}

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingComponent implements OnInit {
  spotifyService = inject(SpotifyServiceService);
  Playlists: any;
  constructor(public themeService: ThemeService) {}
  ngOnInit(): void {
    this.spotifyService.getPlaylistsByName('Anime Soundtracks').subscribe({
      next: (data) => {
        this.Playlists = data.playlists.items;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
