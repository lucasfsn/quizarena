import { Authorization } from '@/app/core/auth/authorization';
import { Button } from '@/app/shared/components/button/button';
import { UserMenu } from '@/app/shared/components/user-menu/user-menu';
import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgOptimizedImage, Button, UserMenu],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly authorizationService = inject(Authorization);

  protected isKeycloakReady = computed(() =>
    this.authorizationService.isReady()
  );
}
