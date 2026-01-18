import { FormControl } from '@angular/forms';

export interface PasswordForm {
  currentPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmNewPassword: FormControl<string>;
}
