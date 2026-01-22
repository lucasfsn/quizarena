import { Player } from '@/app/features/game/types/player';

export interface GameResult {
  gameResultPlayerResponseList: {
    correctAnswers: number;
    score: number;
    player: Player;
  }[];
}
