import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopMangaListComponent } from './top-manga-list.component';

describe('TopMangaListComponent', () => {
  let component: TopMangaListComponent;
  let fixture: ComponentFixture<TopMangaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopMangaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopMangaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
