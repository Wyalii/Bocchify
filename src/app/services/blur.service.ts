import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlurService {
  blur = signal(false);
  burgerMenu = signal(false);
  camMenu = signal(false);
  toggleBurgerMenu() {
    this.camMenu.set(false);
    this.burgerMenu.set(!this.burgerMenu());
    this.blur.set(!this.blur());
  }

  toggleCamMenu() {
    this.burgerMenu.set(false);
    this.blur.set(!this.blur());
    this.camMenu.set(!this.camMenu());
  }

  closeCamMenu() {
    this.blur.set(false);
    this.camMenu.set(false);
  }
  constructor() {}
}
