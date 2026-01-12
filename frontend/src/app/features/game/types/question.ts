import { Answer } from '@/app/features/game/types/answer';

export interface Question {
  text: string;
  answers: Answer[];
  currentIndex: number;
  totalQuestions: number;
  timeLimitSeconds: number;
  startedAt: string;
}
