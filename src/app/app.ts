import { Component, effect, inject, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { ThemeService } from './services/theme-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Bocchify';
  themeService: ThemeService = inject(ThemeService);
  currentTheme = this.themeService.theme;
  isPixelArt = this.themeService.pixelMode;
  private renderer = inject(Renderer2);

  private fontEffect = effect(() => {
    const body = document.body;
    this.renderer.removeClass(
      body,
      this.isPixelArt() ? 'normal-font' : 'pixel-font'
    );
    this.renderer.addClass(
      body,
      this.isPixelArt() ? 'pixel-font' : 'normal-font'
    );
  });

  private backgroundEffect = effect(() => {
    const body = document.body;
    const bgColor = this.currentTheme().backgroundColor;
    this.renderer.setStyle(body, 'background-color', bgColor);
  });
}
