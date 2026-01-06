import { Score } from '@/app/features/game/types/score';

export interface CorrectAnswer {
  answerId: number;
  scores: Score[];
}
