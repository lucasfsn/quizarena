import { inject, Injectable, signal } from '@angular/core';
import { QueryClient } from '@tanstack/angular-query-experimental';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class Authorization {
  private readonly keycloak = inject(Keycloak);
  private readonly queryClient = inject(QueryClient);

  private readonly isInitialized = signal(false);
  public readonly isReady = this.isInitialized.asReadonly();

  public constructor() {
    if (this.keycloak.didInitialize) {
      this.isInitialized.set(true);
    } else {
      this.keycloak.onReady = () => {
        this.isInitialized.set(true);
      };
    }
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

  public isLoggedIn(): boolean {
    return this.keycloak.authenticated;
  }
}
