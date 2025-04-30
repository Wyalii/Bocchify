import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JikanService } from '../../../services/jikan.service';
import { ThemeService } from '../../../services/theme.service';
import { CookieServiceService } from '../../../services/cookie-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manga-details',
  imports: [CommonModule],
  templateUrl: './manga-details.component.html',
  styleUrl: './manga-details.component.scss',
})
export class MangaDetailsComponent implements OnInit {
  mangaId: string | null = null;
  mangaDetails: any = {};
  favourited: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private jikanService: JikanService,
    public themeService: ThemeService,
    private cookieService: CookieServiceService,
    private toastr: ToastrService
  ) {
    this.mangaId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    if (this.mangaId) {
      this.jikanService.getMangaDetails(this.mangaId).subscribe((response) => {
        this.mangaDetails = response;
      });
    }
  }

  addToFavouritesFunc() {
    if (this.cookieService.getToken() === '' || null) {
      return this.toastr.error('Please login first.', 'Error');
    }
    return (this.favourited = !this.favourited);
  }
}
