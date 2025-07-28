import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { SwiperSlide } from '../swiper-slide/swiper-slide';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-custom-swiper',
  imports: [CommonModule, SwiperSlide],
  templateUrl: './custom-swiper.html',
  styleUrl: './custom-swiper.scss',
})
export class CustomSwiper implements OnInit, AfterViewInit {
  @Input() data: any;
  @ViewChildren('slideRef', { read: ElementRef })
  slideRefs!: QueryList<ElementRef>;
  currentIndex = 0;
  transform = 'translateX(0px)';
  transition = 'transform 0.5s ease';
  themeService: ThemeService = inject(ThemeService);
  isPixelArt = this.themeService.pixelMode;
  isDragging: boolean = false;
  @ViewChild('wrapperRef', { static: true }) wrapperRef!: ElementRef;
  wrapper!: HTMLElement;
  startX = 0;
  initialOffset = 0;
  ngOnInit(): void {
    console.log('data from custom swiper:');
    console.log(this.data);
  }

  ngAfterViewInit() {
    this.wrapper = this.wrapperRef.nativeElement;
  }

  onTouchStart(event: TouchEvent) {
    console.log('touchstart fired', event.touches[0].clientX);
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
    this.transition = 'none';
  }
  onTouchMove(event: TouchEvent) {
    if (this.initialOffset > 0) {
      this.initialOffset = 0;
      return;
    }
    if (!this.isDragging) return;
    const currentX = event.touches[0].clientX;
    const deltaX = currentX - this.startX;
    this.transform = `translateX(${this.initialOffset + deltaX}px)`;
  }
  onTouchEnd(event: TouchEvent) {
    if (!this.isDragging) return;
    this.isDragging = false;
    const endX = event.changedTouches[0].clientX;
    const deltaX = endX - this.startX;
    this.initialOffset += deltaX;
    this.transition = 'transform 0.5s ease';
  }

  onMouseDown(event: MouseEvent) {
    console.log('initial offset:', this.initialOffset);
    console.log('wrapper offset width:', this.wrapper.offsetWidth);
    this.isDragging = true;
    this.startX = event.clientX;
    this.transition = 'none';
  }

  onMouseMove(event: MouseEvent) {
    if (this.initialOffset > 0) {
      this.initialOffset = 0;
      return;
    }
    if (!this.isDragging) return;
    const currentX = event.clientX;
    const deltaX = currentX - this.startX;
    this.transform = `translateX(${this.initialOffset + deltaX}px)`;
  }
  onMouseUp(event: MouseEvent) {
    console.log('initial offset:', this.initialOffset);
    console.log('wrapper offset width:', this.wrapper.offsetWidth);
    if (!this.isDragging) return;
    this.isDragging = false;

    const endX = event.clientX;
    const deltaX = endX - this.startX;
    this.initialOffset += deltaX;
    this.transition = 'transform 0.5s ease';
  }
  next() {
    const slides = this.slideRefs.toArray();
    if (this.currentIndex < slides.length - 2) {
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
