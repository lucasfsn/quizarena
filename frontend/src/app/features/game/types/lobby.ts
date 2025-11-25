import { GamePhase } from '@/app/features/game/types/game-phase';
import { Player } from '@/app/features/game/types/player';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';

export interface LobbyPayload {
  roomCode: string;
  quiz: QuizPreview;
  players: Player[];
  phase: GamePhase;
  hostId: string;
}

export interface LobbyMessage {
  type: 'lobby';
  payload: LobbyPayload;
}
