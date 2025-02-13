import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnInit,
} from '@angular/core';
import { SpotifyServiceService } from '../../services/spotify-service.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingComponent implements OnInit {
  spotifyService = inject(SpotifyServiceService);
  Albums: any;

  ngOnInit(): void {
    this.spotifyService.getAlbumsByName('Bleach Soundtrack').subscribe({
      next: (data) => {
        this.Albums = data.albums.items;
        console.log(this.Albums);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
