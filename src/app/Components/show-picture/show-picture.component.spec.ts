import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPictureComponent } from './show-picture.component';

describe('ShowPictureComponent', () => {
  let component: ShowPictureComponent;
  let fixture: ComponentFixture<ShowPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowPictureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
