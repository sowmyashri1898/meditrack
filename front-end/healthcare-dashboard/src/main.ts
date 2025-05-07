import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient(withFetch())  // <-- Add withFetch()
//   ]
// }).catch(err => console.error(err));
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations()
]
})
  .catch(err => console.error(err));