import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaListComponent } from './manga-list.component';

describe('MangaListComponent', () => {
  let component: MangaListComponent;
  let fixture: ComponentFixture<MangaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MangaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MangaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
