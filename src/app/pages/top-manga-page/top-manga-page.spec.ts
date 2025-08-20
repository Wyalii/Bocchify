import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMangaPage } from './top-manga-page';

describe('TopMangaPage', () => {
  let component: TopMangaPage;
  let fixture: ComponentFixture<TopMangaPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMangaPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMangaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
