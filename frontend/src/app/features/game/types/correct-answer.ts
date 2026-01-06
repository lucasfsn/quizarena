import { Scores } from '@/app/features/game/types/scores';

export interface CorrectAnswer {
  answerId: number;
  scores: Scores[];
}
