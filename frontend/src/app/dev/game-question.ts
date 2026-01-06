import { Question } from '@/app/features/game/types/question';

export const MOCK_GAME_QUESTION: Question = {
  id: 'f0fa0158-f44d-43f9-81b3-fb05edee0ba5',
  text: 'Which planet in our solar system is known as the “Red Planet”?',
  answers: [
    { text: 'Earth' },
    {
      text: 'Mars',
    },
    { text: 'Jupiter' },
    {
      text: 'Venus',
    },
  ],
  timeLimitSeconds: 30,
  currentIndex: 8,
  totalQuestions: 20,
  startedAt: new Date().toISOString(),
};
