import { Player } from '@/app/features/game/types/player';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';

export interface LobbyPlayer {
  player: Player;
  isHost?: boolean;
  isConnected: boolean;
}

export interface Lobby {
  roomCode: string;
  quiz: QuizPreview;
  players: LobbyPlayer[];
  isStarted: boolean;
  hostId: string;
}
