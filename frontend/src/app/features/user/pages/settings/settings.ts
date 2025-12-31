import { ChangeSettingsForm } from '@/app/features/user/components/change-settings-form/change-settings-form';
import { User } from '@/app/features/user/services/user/user';
import { Component, effect, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-settings',
  imports: [ChangeSettingsForm],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {
  private readonly titleService = inject(Title);
  private readonly userService = inject(User);

  public userQuery = injectQuery(() => ({
    ...this.userService.userOptions(),
    select: (user) => user.username,
  }));

  public constructor() {
    effect(() => {
      const username = this.userQuery.data();

      if (username) this.titleService.setTitle(`Settings - @${username}`);
    });
  }
}
