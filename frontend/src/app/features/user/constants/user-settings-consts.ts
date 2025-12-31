import { UserSettingsConsts } from '@/app/features/user/types/user-settings-consts';

export const USER_SETTINGS_CONSTRAINTS: UserSettingsConsts = {
  USERNAME_MIN_LENGTH: 3,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 64,
} as const;
