const leaderboardQueryKey = ['leaderboards'] as const;

export function getLeaderboardQueryKey(id?: string): readonly string[] {
  return id ? [...leaderboardQueryKey, id] : leaderboardQueryKey;
}
