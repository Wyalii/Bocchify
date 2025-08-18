import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopAnimePage } from './top-anime-page';

describe('TopAnimePage', () => {
  let component: TopAnimePage;
  let fixture: ComponentFixture<TopAnimePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopAnimePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopAnimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
