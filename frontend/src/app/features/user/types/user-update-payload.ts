export interface UserUpdatePayload {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: {
    currentPassword: string;
    newPassword: string;
  };
}
