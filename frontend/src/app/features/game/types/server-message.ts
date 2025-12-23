import { GameDetails } from '@/app/features/game/types/game-details';
import { GameResult } from '@/app/features/game/types/game-result';
import { Question } from '@/app/features/game/types/question';

export type ServerMessage =
  | { type: 'LOBBY_UPDATE'; payload: GameDetails }
  | { type: 'QUESTION'; payload: Question }
  | { type: 'CORRECT_ANSWER'; payload: { correctAnswerId: string } }
  | { type: 'GAME_FINISHED'; payload: GameResult }
  | { type: 'ERROR'; payload: { message: string } };
