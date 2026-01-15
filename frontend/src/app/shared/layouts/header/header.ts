import { Authorization } from '@/app/core/auth/authorization';
import { Button } from '@/app/shared/components/button/button';
import { UserButton } from '@/app/shared/components/user-button/user-button';
import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-header',
  imports: [RouterLink, PopoverModule, UserButton, NgOptimizedImage, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly authorizationService = inject(Authorization);

  protected onLogin(): void {
    this.authorizationService.login();
  }

  protected onLogout(): void {
    this.authorizationService.logout();
  }

  protected isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  protected isKeycloakReady(): boolean {
    return this.authorizationService.isReady();
  }
}
