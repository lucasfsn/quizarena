import { inject, Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class Authorization {
  private keycloak = inject(Keycloak);

  public login(): void {
    this.keycloak.login();
  }

  public logout(): void {
    this.keycloak.logout();
  }

  public isLoggedIn(): boolean {
    return this.keycloak.authenticated;
  }
}
