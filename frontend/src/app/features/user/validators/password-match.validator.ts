import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const areAllPasswordFieldsEmpty = (
  current: string,
  next: string,
  confirm: string
): boolean => !current && !next && !confirm;

const isAnyPasswordFieldMissing = (
  current: string,
  next: string,
  confirm: string
): boolean => !current || !next || !confirm;

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const current = control.get('currentPassword')?.value;
  const next = control.get('newPassword')?.value;
  const confirm = control.get('confirmNewPassword')?.value;

  if (areAllPasswordFieldsEmpty(current, next, confirm)) return null;

  if (isAnyPasswordFieldMissing(current, next, confirm))
    return { passwordIncomplete: true };

  return next === confirm ? null : { passwordsMismatch: true };
};
