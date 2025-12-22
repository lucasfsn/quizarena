import { AnswerResults } from '@/app/features/game/types/answer-results';
import { GameResult } from '@/app/features/game/types/game-result';
import { Lobby } from '@/app/features/game/types/lobby';
import { Question } from '@/app/features/game/types/question';

export type ServerMessage =
  | { type: 'LOBBY_UPDATE'; payload: Lobby }
  | { type: 'QUESTION'; payload: Question }
  | { type: 'ANSWER_RESULTS'; payload: AnswerResults }
  | { type: 'GAME_FINISHED'; payload: GameResult }
  | { type: 'ERROR'; payload: { message: string } };
