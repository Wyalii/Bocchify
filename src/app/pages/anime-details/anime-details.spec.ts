import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDetails } from './anime-details';

describe('AnimeDetails', () => {
  let component: AnimeDetails;
  let fixture: ComponentFixture<AnimeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
