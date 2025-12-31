import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// eslint-disable-next-line complexity
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const current = control.get('currentPassword')?.value;
  const next = control.get('newPassword')?.value;
  const confirm = control.get('confirmNewPassword')?.value;

  if (!current && !next && !confirm) return null;

  if (!current || !next || !confirm) return { passwordIncomplete: true };

  return next === confirm ? null : { passwordsMismatch: true };
};
