import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiedSuccessComponent } from './verified-success.component';

describe('VerifiedSuccessComponent', () => {
  let component: VerifiedSuccessComponent;
  let fixture: ComponentFixture<VerifiedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifiedSuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifiedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
