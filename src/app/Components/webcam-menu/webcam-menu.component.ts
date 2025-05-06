import { Component } from '@angular/core';
import { WebcamModule } from 'ngx-webcam';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { BlurService } from '../../services/blur.service';
@Component({
  selector: 'app-webcam-menu',
  imports: [WebcamModule, CommonModule],
  templateUrl: './webcam-menu.component.html',
  styleUrl: './webcam-menu.component.scss',
  standalone: true,
})
export class WebcamMenuComponent {
  constructor(
    public themeService: ThemeService,
    private blurService: BlurService
  ) {}
  closeWebCam() {
    this.blurService.closeCamMenu();
  }
}
