import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';
import { WebcamModule } from 'ngx-webcam';
import { BlurService } from '../../../services/blur.service';
import { FormsModule } from '@angular/forms';
import { ImageUploadService } from '../../../services/image-upload.service';
import { BackendService } from '../../../services/backend.service';
import { CookieServiceService } from '../../../services/cookie-service.service';
import { UpdateProfileRequestInterface } from '../../../interfaces/update-profile-request-interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, WebcamModule, FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public themeService: ThemeService,
    public blurService: BlurService,
    private imageUploadService: ImageUploadService,
    private backendService: BackendService,
    private cookieService: CookieServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  @ViewChild('fileUpload', { static: false })
  fileUploadInput!: ElementRef<HTMLInputElement>;
  username: string = '';
  profilePicture: string | null = null;
  selectedPage: string = 'Profile';
  email: string = 'test@gmail.com';
  capturedImage: string = '';
  selectedImageFile: File | null = null;
  selectedImageUrl: string | null = null;
  isReadOnly: boolean = true;

  ngOnInit(): void {
    this.userService.getUserInfo();
    this.userService.email$.subscribe((email) => {
      this.email = email;
    });
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
      this.imageUploadService.uploadImage(file).subscribe({
        next: (response) => {
          console.log(response);
          this.userService.setCapturedImage(response.secure_url);
        },
      });
    }
  }

  handleReadOnly() {
    this.isReadOnly = !this.isReadOnly;
  }

  updateProfile() {
    const token = this.cookieService.getToken();
    const profilePicture = this.userService.getCapturedImage() ?? undefined;
    console.log(profilePicture);
    const request: UpdateProfileRequestInterface = {
      token: token,
      username: this.username,
      password: undefined,
      email: undefined,
      profilePicture: profilePicture,
    };
    this.backendService.updateProfile(request).subscribe({
      next: (response) => {
        console.log(response);
        this.cookieService.deleteToken();
        this.cookieService.setToken(response.token);
        console.log(response.user);
        this.userService.setUser(
          response.user.username,
          response.user.profileImage
        );
        this.router.navigate(['/']);
        setTimeout(() => {
          window.location.reload();
        }, 500);
        this.toastr.success(`${response.message}`);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
