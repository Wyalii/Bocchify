import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsSlider } from './tops-slider';

describe('TopsSlider', () => {
  let component: TopsSlider;
  let fixture: ComponentFixture<TopsSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopsSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopsSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
