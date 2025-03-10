import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-anime-card',
  imports: [CommonModule],
  templateUrl: './anime-card.component.html',
  styleUrl: './anime-card.component.scss',
})
export class AnimeCardComponent {
  constructor(private router: Router) {}
  @Input() anime: any;

  navigateToAnimeDetails(AnimeId: number) {
    this.router.navigate(['/anime', AnimeId]);
  }
}
