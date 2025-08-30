import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaDetails } from './manga-details';

describe('MangaDetails', () => {
  let component: MangaDetails;
  let fixture: ComponentFixture<MangaDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
