import { environment } from '@/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  PLATFORM_ID,
  provideAppInitializer,
} from '@angular/core';
import {
  createInterceptorCondition,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  IncludeBearerTokenCondition,
  provideKeycloak,
} from 'keycloak-angular';
import Keycloak, { KeycloakConfig } from 'keycloak-js';

export function provideKeycloakAuth(): EnvironmentProviders {
  const keycloakConfig: KeycloakConfig = {
    url: environment.keycloak.authority,
    realm: environment.keycloak.realm,
    clientId: environment.keycloak.clientId,
  };

  const urlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
    urlPattern: new RegExp(`^(${environment.apiUrl})(/.*)?$`, 'i'),
    bearerPrefix: 'Bearer',
  });

  return makeEnvironmentProviders([
    provideKeycloak({ config: keycloakConfig }),
    provideAppInitializer(() => {
      const platformId = inject(PLATFORM_ID);
      const keycloak = inject(Keycloak);

      if (isPlatformBrowser(platformId))
        return keycloak.init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        });

      return Promise.resolve();
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [urlCondition],
    },
  ]);
}
