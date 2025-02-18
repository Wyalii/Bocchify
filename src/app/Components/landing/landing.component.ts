import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { YoutubeServiceService } from '../../services/youtube-service.service';
@Component({
  selector: 'app-landing',
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingComponent implements OnInit {
  constructor(
    public themeService: ThemeService,
    public youtubeService: YoutubeServiceService
  ) {}
  OpeningsDefault: boolean = true;
  EndingsDefault: boolean = false;
  SoundTracksDefault: boolean = false;
  AnimesDefault: boolean = false;

  category: string = '';
  selectCategory(categoryInput: string) {
    this.category = categoryInput;
  }
  ngOnInit(): void {
    this.youtubeService.getBleachOpenings('PLWgzYL0xXn_gN6TEiOVrX4xYzLIg-0bj0');
  }
}
