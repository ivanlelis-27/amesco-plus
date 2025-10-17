import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/services/auth-interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    ...appConfig.providers || [],
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ]
}).catch((err) => console.error(err));