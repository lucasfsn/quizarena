import { LeaderboardEntry } from '@/app/features/leaderboards/types/leaderboard-entry';

export interface LeaderboardResponse {
  content: LeaderboardEntry[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
