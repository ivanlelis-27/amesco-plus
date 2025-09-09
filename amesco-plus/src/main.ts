import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    ...appConfig.providers || [],
    provideAnimations()
  ]
}).catch((err) => console.error(err));