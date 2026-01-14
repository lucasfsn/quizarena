import { GameDetails } from '@/app/features/game/types/game-details';
import { Question } from '@/app/features/game/types/question';
import { GameStatus } from '@/app/store/reducers/game.reducers';

export interface GameSession {
  gameDetailsResponse: GameDetails;
  gameStatus: GameStatus;
  currentQuestion?: Question;
  correctAnswerId?: number;
  submittedAnswerId?: number;
  host: boolean;
}
