import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { register as registerSwiperEelements } from 'swiper/element/bundle';
import { appConfig } from './app/app.config';
registerSwiperEelements();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
