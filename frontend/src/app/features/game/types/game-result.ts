import { Player } from '@/app/features/game/types/player';

export interface GameResultPlayer {
  correctAnswers: number;
  score: number;
  position: number;
  player: Player;
}

export interface GameResult {
  gameResultPlayerResponseList: GameResultPlayer[];
}
