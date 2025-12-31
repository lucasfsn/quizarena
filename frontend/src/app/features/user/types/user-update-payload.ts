export interface UserUpdatePayload {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: PasswordPayload;
}

export interface PasswordPayload {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}
