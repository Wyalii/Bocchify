import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebcamMenuComponent } from './webcam-menu.component';

describe('WebcamMenuComponent', () => {
  let component: WebcamMenuComponent;
  let fixture: ComponentFixture<WebcamMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebcamMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebcamMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
