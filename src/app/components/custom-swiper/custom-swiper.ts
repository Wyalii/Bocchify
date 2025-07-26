import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SwiperSlide } from '../swiper-slide/swiper-slide';

@Component({
  selector: 'app-custom-swiper',
  imports: [CommonModule, SwiperSlide],
  templateUrl: './custom-swiper.html',
  styleUrl: './custom-swiper.scss',
})
export class CustomSwiper implements OnInit {
  @Input() data: any;
  currentIndex = 0;
  slideWidth = 300;
  transition = 'transform 0.3s ease';
  ngOnInit(): void {
    console.log('data from custom swiper:');
    console.log(this.data);
  }

  get transform() {
    return `translateX(-${this.currentIndex * this.slideWidth}px)`;
  }
  next() {
    if (this.currentIndex < (this.data?.length ?? 0) - 1) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
