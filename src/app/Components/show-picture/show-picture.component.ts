import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-picture',
  imports: [CommonModule,FormsModule],
  templateUrl: './show-picture.component.html',
  styleUrl: './show-picture.component.scss'
})
export class ShowPictureComponent {
}
