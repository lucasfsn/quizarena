const leaderboardQueryKey = ['leaderboard'] as const;

export function getLeaderboardQueryKey(): readonly string[] {
  return leaderboardQueryKey;
}
