import { ChangeSettingsForm } from '@/app/features/user/components/change-settings-form/change-settings-form';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings',
  imports: [ChangeSettingsForm],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
})
export class Settings {}
