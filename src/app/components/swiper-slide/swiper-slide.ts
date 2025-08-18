import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-swiper-slide',
  imports: [],
  templateUrl: './swiper-slide.html',
  styleUrl: './swiper-slide.scss',
})
export class SwiperSlide implements OnInit {
  @Input() item: any;
  ngOnInit(): void {
    console.log('given item on swiper-slide:');
    console.log(this.item);
  }
}
