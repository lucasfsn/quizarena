import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';
import { Player } from '@/app/features/game/types/player';

export interface GameDetails {
  roomCode: string;
  quiz: QuizPreview;
  maxPlayers: number;
  players: Player[];
}
