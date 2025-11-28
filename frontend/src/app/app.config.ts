import { routes } from '@/app/app.routes';
import { apiErrorInterceptor } from '@/app/core/interceptors/api-error-interceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { provideTanStackQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { withDevtools } from '@tanstack/angular-query-experimental/devtools';
import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import { provideKeycloakAuth } from '@/app/core/auth/keycloak';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideKeycloakAuth(),
    provideHttpClient(
      withFetch(),
      withInterceptors([apiErrorInterceptor, includeBearerTokenInterceptor]),
    ),
    provideTanStackQuery(
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute,
          },
        },
      }),
      withDevtools(),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false,
        },
      },
    }),
  ],
};
