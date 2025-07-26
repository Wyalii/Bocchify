import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-swiper-slide',
  imports: [],
  templateUrl: './swiper-slide.html',
  styleUrl: './swiper-slide.scss',
})
export class SwiperSlide {
  @Input() item: any;
}
