import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaSearch } from './manga-search';

describe('MangaSearch', () => {
  let component: MangaSearch;
  let fixture: ComponentFixture<MangaSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaSearch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
