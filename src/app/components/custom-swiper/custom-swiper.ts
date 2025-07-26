import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SwiperSlide } from '../swiper-slide/swiper-slide';

@Component({
  selector: 'app-custom-swiper',
  imports: [CommonModule, SwiperSlide],
  templateUrl: './custom-swiper.html',
  styleUrl: './custom-swiper.scss',
})
export class CustomSwiper implements OnInit {
  @Input() data: any;
  @ViewChildren('slideRef', { read: ElementRef })
  slideRefs!: QueryList<ElementRef>;
  currentIndex = 0;
  transform = 'translateX(0px)';
  transition = 'transform 0.5s ease';
  ngOnInit(): void {
    console.log('data from custom swiper:');
    console.log(this.data);
  }
  next() {
    const slides = this.slideRefs.toArray();
    if (this.currentIndex < slides.length - 5) {
      this.currentIndex++;
      this.updateTransform();
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateTransform();
    }
  }

  updateTransform() {
    const slides = this.slideRefs.toArray();
    let offset = 0;

    for (let i = 0; i < this.currentIndex; i++) {
      offset += slides[i].nativeElement.offsetWidth;
    }

    this.transform = `translateX(-${offset}px)`;
  }
}
