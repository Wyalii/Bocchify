import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BurgerServiceService {
  burgerMenu = signal(false);
  toggleMenu() {
    this.burgerMenu.set(!this.burgerMenu());
  }
  constructor() {}
}
