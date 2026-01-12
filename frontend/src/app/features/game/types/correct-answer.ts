import { Score } from '@/app/features/game/types/score';

export interface CorrectAnswer {
  correctAnswerId: number;
  players: Score[];
}
