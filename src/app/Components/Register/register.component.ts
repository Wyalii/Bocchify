import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'Register',
  templateUrl: 'register.component.html',
  styleUrl: 'register.component.scss',
  imports: [CommonModule],
})
export class Register {
  @Input() resetForm: () => void = () => {};
  goBackToForm() {
    this.resetForm();
  }
}
