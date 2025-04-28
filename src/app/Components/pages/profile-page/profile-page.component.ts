import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  imports: [],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  username: string = '';
  profilePicture: string | null = null;
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
  }
}
