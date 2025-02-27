import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { register as registerSwiperEelements } from 'swiper/element/bundle';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
registerSwiperEelements();

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserAnimationsModule),
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
