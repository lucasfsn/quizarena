const gameResultQueryKey = ['results'] as const;

export function getGameResultQueryKey(id?: string): readonly string[] {
  return id ? [...gameResultQueryKey, id] : gameResultQueryKey;
}
