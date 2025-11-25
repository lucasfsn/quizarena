import { User } from '@/app/features/auth/types/user';

export interface Player {
  user: User;
  score: number;
  isHost?: boolean;
  isConnected: boolean;
}
