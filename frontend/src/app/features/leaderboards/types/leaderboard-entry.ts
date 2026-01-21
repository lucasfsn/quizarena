export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  rank?: number;
  wins?: number;
  winRate?: number;
}
