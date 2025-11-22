const quizzesQueryKey = ['quizzes'] as const;

export function getQuizzesQueryKey(id?: string): readonly string[] {
  return id ? [...quizzesQueryKey, id] : quizzesQueryKey;
}
