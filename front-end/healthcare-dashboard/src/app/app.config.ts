import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PrimeIcons } from 'primeng/api';
import{TabMenu} from 'primeng/tabmenu';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideAnimations(),provideHttpClient(withInterceptorsFromDi()),TabMenu,PrimeIcons, provideAnimationsAsync(),    provideHttpClient(withFetch())  // Enabling fetch for HttpClient
  ],
};
