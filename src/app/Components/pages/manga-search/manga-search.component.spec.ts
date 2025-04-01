import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaSearchComponent } from './manga-search.component';

describe('MangaSearchComponent', () => {
  let component: MangaSearchComponent;
  let fixture: ComponentFixture<MangaSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
