import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-swiper-slide',
  imports: [CommonModule],
  templateUrl: './swiper-slide.html',
  styleUrl: './swiper-slide.scss',
})
export class SwiperSlide implements OnInit {
  @Input() item: any;
  router: Router = inject(Router);
  ngOnInit(): void {
    console.log('given item on swiper-slide:');
    console.log(this.item);
  }
  goToAnimeDetailsPage(AnimeId: number) {
    this.router.navigate(['/anime', AnimeId]);
  }
  goToMangaDetailsPage(MangaId: number) {
    this.router.navigate(['/manga', MangaId]);
  }
}
