import { Player } from '@/app/features/game/types/player';

export interface GameResult {
  gameResultPlayerResponseList: {
    correctAnswers: number;
    score: number;
    position: number;
    player: Player;
  }[];
}
