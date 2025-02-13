import { Component, inject, OnInit } from '@angular/core';
import { ThemeBtn } from '../ThemeBtn/ThemeBtn.component';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  imports: [ThemeBtn, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  tokenService = inject(TokenService);
  decodedToken: any;

  constructor(public themeService: ThemeService) {}
  ngOnInit(): void {
    this.tokenService.decodedToken$.subscribe((decodedUserToken) => {
      if (decodedUserToken) {
        this.decodedToken = decodedUserToken;
      }
    });
  }
}
