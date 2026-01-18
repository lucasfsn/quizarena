import { Authorization } from '@/app/core/auth/authorization';
import { Button } from '@/app/shared/components/button/button';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Popover } from 'primeng/popover';

@Component({
  selector: 'app-user-menu',
  imports: [RouterLink, Button, Popover],
  templateUrl: './user-menu.html',
  styleUrl: './user-menu.scss',
})
export class UserMenu {
  private readonly authorizationService = inject(Authorization);

  protected isLoggedIn = computed(() => this.authorizationService.isLoggedIn());

  protected handleLogin(): void {
    this.authorizationService.login();
  }

  protected handleLogout(): void {
    this.authorizationService.logout();
  }
}
