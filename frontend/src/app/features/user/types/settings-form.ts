import { PasswordForm } from '@/app/features/user/types/password-form';
import { FormControl, FormGroup } from '@angular/forms';

export interface SettingsForm {
  username: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormGroup<PasswordForm>;
}
