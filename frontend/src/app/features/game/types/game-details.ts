import { Player } from '@/app/features/game/types/player';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';

export interface GameDetailsPlayer {
  player: Player;
  isHost?: boolean;
  isConnected: boolean;
}

export interface GameDetails {
  roomCode: string;
  quiz: QuizPreview;
  players: GameDetailsPlayer[];
  hostId: string;
}
