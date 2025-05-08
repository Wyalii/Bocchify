import { Component, EventEmitter, Output } from '@angular/core';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { BlurService } from '../../services/blur.service';
import { ImageUploadService } from '../../services/image-upload.service';
import { Subject } from 'rxjs';
import { UserService } from '../../services/user.service';
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
    private blurService: BlurService,
    private imageUploadService: ImageUploadService,
    private userService: UserService
  ) {}

  webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();
  triggerObservable = this.trigger.asObservable();

  takePhoto() {
    this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.imageUploadService
      .uploadDataUrl(webcamImage.imageAsDataUrl)
      .subscribe({
        next: (response) => {
          console.log('Upload Success:', response);
          const url = response.secure_url;
          this.userService.capturedImage = url;
          console.log('captured image log:', this.userService.capturedImage);
        },
        error: (err) => {
          console.error('Upload Failed', err);
        },
      });
  }
  closeWebCam() {
    this.blurService.closeCamMenu();
  }
}
