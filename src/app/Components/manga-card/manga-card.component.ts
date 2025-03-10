import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manga-card',
  imports: [],
  templateUrl: './manga-card.component.html',
  styleUrl: './manga-card.component.scss',
})
export class MangaCardComponent {
  constructor(private router: Router) {}
  @Input() manga: any;
  navigateToMangaDetails(MangaId: number) {
    this.router.navigate(['/manga', MangaId]);
  }
}
