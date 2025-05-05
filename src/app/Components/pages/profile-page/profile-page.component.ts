import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public themeService: ThemeService
  ) {}
  username: string = '';
  profilePicture: string | null = null;
  selectedPage: string = 'Profile';
  email: string = 'someomeail@gmail.com';
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.profilePicture = this.userService.getProfileImage();
  }
}
