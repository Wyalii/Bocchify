import { Component, OnInit } from '@angular/core';
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
    public blurService: BlurService,
    private imageUploadService: ImageUploadService
  ) {}
  username: string = '';
  profilePicture: string | null = null;
  selectedPage: string = 'Profile';
  email: string = 'someomeail@gmail.com';
  capturedImage: string = '';
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.profilePicture = this.userService.getProfileImage();
  }
  handleCamMenu() {
    this.blurService.toggleCamMenu();
  }
}
