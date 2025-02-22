import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { AnimeService } from '../../services/anime.service';
import { AnimeCardComponent } from '../anime-card/anime-card.component';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, AnimeCardComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingComponent implements OnInit {
  constructor(
    public themeService: ThemeService,
    public animeService: AnimeService
  ) {}
  topAnimes: any[] = [];
  ngOnInit(): void {
    this.animeService.getTopAnimes().subscribe({
      next: (animeData) => {
        this.topAnimes = animeData;
        console.log(this.topAnimes);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
