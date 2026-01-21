import { Score } from '@/app/features/game/types/score';

export interface CorrectAnswer {
  correctAnswerIds: number[];
  players: Score[];
}
