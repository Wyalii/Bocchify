import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-anime-card',
  imports: [CommonModule],
  templateUrl: './anime-card.component.html',
  styleUrl: './anime-card.component.scss',
})
export class AnimeCardComponent implements OnInit {
  @Input() anime: any;

  ngOnInit(): void {}
}
