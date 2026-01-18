import { effect, inject, Injectable, signal } from '@angular/core';
import { QueryClient } from '@tanstack/angular-query-experimental';
import {
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEventType,
  ReadyArgs,
  typeEventArgs,
} from 'keycloak-angular';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class Authorization {
  private readonly keycloak = inject(Keycloak);
  private readonly queryClient = inject(QueryClient);
  private readonly keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

  private readonly isInitialized = signal(false);
  public readonly isReady = this.isInitialized.asReadonly();

  private readonly isAuthenticated = signal(false);
  public readonly isLoggedIn = this.isAuthenticated.asReadonly();

  public constructor() {
    effect(() => {
      const keycloakEvent = this.keycloakSignal();

      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.isInitialized.set(true);
        this.isAuthenticated.set(typeEventArgs<ReadyArgs>(keycloakEvent.args));
      }

      if (keycloakEvent.type === KeycloakEventType.AuthLogout)
        this.isAuthenticated.set(false);
    });
  }

  public login(): void {
    this.keycloak.login();
  }

  public logout(): void {
    this.queryClient.clear();

    this.keycloak.logout({
      redirectUri: window.location.origin,
    });
  }
}
