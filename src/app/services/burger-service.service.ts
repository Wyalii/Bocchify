import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BurgerServiceService {
  burgerMenu = signal(false);
  burgerMenuValue() {
    return this.burgerMenu;
  }
  toggleMenu() {
    this.burgerMenu.set(!this.burgerMenu());
  }
  constructor() {}
}
