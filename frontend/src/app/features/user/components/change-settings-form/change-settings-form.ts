import { CURRENT_USER_QUERY_KEY } from '@/app/features/user/constants/current-user-query-key';
import { USER_SETTINGS_CONSTRAINTS } from '@/app/features/user/constants/user-settings-consts';
import { getUserQueryKey } from '@/app/features/user/queries/get-user-query-key';
import { User } from '@/app/features/user/services/user/user';
import {
  PasswordForm,
  SettingsForm,
} from '@/app/features/user/types/settings-form';
import { UserUpdatePayload } from '@/app/features/user/types/user-update-payload';
import { passwordMatchValidator } from '@/app/features/user/validators/password-match.validator';
import { Button } from '@/app/shared/components/button/button';
import { Toast } from '@/app/shared/services/toast/toast';
import { Component, effect, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-change-settings-form',
  imports: [ReactiveFormsModule, InputText, FloatLabel, PasswordModule, Button],
  templateUrl: './change-settings-form.html',
  styleUrl: './change-settings-form.scss',
})
export class ChangeSettingsForm {
  private readonly userService = inject(User);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly queryClient = inject(QueryClient);
  private readonly toastService = inject(Toast);

  public userQuery = injectQuery(() => this.userService.userOptions());

  protected readonly settingsForm: FormGroup<SettingsForm> =
    this.formBuilder.group<SettingsForm>({
      username: this.formBuilder.control('', [
        Validators.required,
        Validators.minLength(USER_SETTINGS_CONSTRAINTS.USERNAME_MIN_LENGTH),
      ]),
      firstName: this.formBuilder.control('', [Validators.required]),
      lastName: this.formBuilder.control('', [Validators.required]),
      email: this.formBuilder.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.formBuilder.group<PasswordForm>(
        {
          currentPassword: this.formBuilder.control(''),
          newPassword: this.formBuilder.control('', [
            Validators.minLength(USER_SETTINGS_CONSTRAINTS.PASSWORD_MIN_LENGTH),
            Validators.maxLength(USER_SETTINGS_CONSTRAINTS.PASSWORD_MAX_LENGTH),
          ]),
          confirmNewPassword: this.formBuilder.control(''),
        },
        {
          validators: [passwordMatchValidator],
        }
      ),
    });

  public constructor() {
    effect(() => {
      const user = this.userQuery.data();
      if (!user) return;

      this.settingsForm.patchValue({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    });
  }

  protected changeSettings(): void {
    if (this.settingsForm.invalid) return;

    const payload = this.buildUpdatePayload();
    console.log(payload);

    if (Object.keys(payload).length === 0) return;

    this.updateSettingsMutation.mutate(payload as UserUpdatePayload);
  }

  private buildUpdatePayload(): Partial<UserUpdatePayload> {
    const { username, firstName, lastName, email, password } =
      this.settingsForm.controls;
    const payload: Partial<UserUpdatePayload> = {};

    if (username.dirty) payload.username = username.value;
    if (firstName.dirty) payload.firstName = firstName.value;
    if (lastName.dirty) payload.lastName = lastName.value;
    if (email.dirty) payload.email = email.value;

    const { currentPassword, newPassword } = password.controls;
    if (currentPassword.value && newPassword.value)
      payload.password = {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      };

    return payload;
  }

  protected isUpdating(): boolean {
    return this.updateSettingsMutation.isPending();
  }

  private updateSettingsMutation = injectMutation(() => ({
    mutationFn: (payload: UserUpdatePayload) =>
      lastValueFrom(this.userService.changeSettings(payload)),
    onSuccess: (updatedUser) => {
      this.queryClient.setQueryData(
        getUserQueryKey(CURRENT_USER_QUERY_KEY),
        updatedUser
      );
      this.toastService.success('Settings updated successfully.');
      this.settingsForm.markAsPristine();
    },
    onError: (error) => this.toastService.error(error.message),
  }));
}
