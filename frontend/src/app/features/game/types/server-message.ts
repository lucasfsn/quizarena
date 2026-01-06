import { GameDetails } from '@/app/features/game/types/game-details';
import { Question } from '@/app/features/game/types/question';

export type ServerMessage =
  | { eventType: 'LOBBY_UPDATE'; payload: GameDetails }
  | { eventType: 'LOBBY_CLOSE'; payload: null }
  | { eventType: 'QUESTION'; payload: Question }
  | { eventType: 'CORRECT_ANSWER'; payload: { correctAnswerId: number } }
  | { eventType: 'GAME_FINISHED'; payload: { summaryId: string } }
  | { eventType: 'ERROR'; payload: { message: string } };
