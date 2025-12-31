const userQueryKey = ['users'] as const;

export function getUserQueryKey(id?: string): readonly string[] {
  return id ? [...userQueryKey, id] : userQueryKey;
}
