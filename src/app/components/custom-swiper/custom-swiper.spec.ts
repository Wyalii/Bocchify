import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSwiper } from './custom-swiper';

describe('CustomSwiper', () => {
  let component: CustomSwiper;
  let fixture: ComponentFixture<CustomSwiper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomSwiper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomSwiper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
