import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-manga-card',
  imports: [],
  templateUrl: './manga-card.component.html',
  styleUrl: './manga-card.component.scss',
})
export class MangaCardComponent {
  @Input() manga: any;
}
