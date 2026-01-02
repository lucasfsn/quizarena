export interface UserUpdatePayload {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: PasswordPayload;
}

interface PasswordPayload {
  currentPassword: string;
  newPassword: string;
}
