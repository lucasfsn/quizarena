import { Player } from '@/app/features/game/types/player';

export interface GameResultPlayer {
  score: number;
  position: number;
  player: Player;
}

export interface GameResult {
  players: GameResultPlayer[];
  winnerId: string;
}
