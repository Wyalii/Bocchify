import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { WebcamModule } from 'ngx-webcam';
import { BlurService } from '../../../services/blur.service';
import { ImageUploadService } from '../../../services/image-upload.service';
@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, WebcamModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public themeService: ThemeService,
    public blurService: BlurService
  ) {}
  @ViewChild('fileUpload', { static: false })
  fileUploadInput!: ElementRef<HTMLInputElement>;
  username: string = '';
  profilePicture: string | null = null;
  selectedPage: string = 'Profile';
  email: string = 'someomeail@gmail.com';
  capturedImage: string = '';
  selectedImageFile: File | null = null;
  selectedImageUrl: string | null = null;
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.profilePicture = this.userService.getProfileImage();
    this.userService.profileImage$.subscribe((image) => {
      this.capturedImage = image;
    });
  }
  ngOnDestroy(): void {
    this.capturedImage = '';
    this.userService.clearCapturedImage();
  }
  handleCamMenu() {
    this.blurService.toggleCamMenu();
  }
  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedImageFile = file;
      console.log('selected image file:', this.selectedImageFile);
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  triggerFileUpload() {
    console.log('file upload input element:', this.fileUploadInput);
    this.fileUploadInput.nativeElement.click();
  }
}
