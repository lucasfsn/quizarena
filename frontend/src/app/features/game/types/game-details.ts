import { Player } from '@/app/features/game/types/player';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';

export interface GameDetails {
  roomCode: string;
  quiz: QuizPreview;
  maxPlayers: number;
  players: Player[];
}
