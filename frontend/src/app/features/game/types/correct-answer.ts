import { Score } from '@/app/features/game/types/score';

export interface CorrectAnswer {
  correctAnswersIds: number[];
  players: Score[];
}
