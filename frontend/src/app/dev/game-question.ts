import { Question } from '@/app/features/game/types/question';

export const MOCK_GAME_QUESTION: Question = {
  id: 'f0fa0158-f44d-43f9-81b3-fb05edee0ba5',
  text: 'Which planet in our solar system is known as the “Red Planet”?',
  answers: [
    { id: '887013fd-65b8-4289-95f7-a575eeb221c5', label: 'Earth' },
    {
      id: '57ad975b-6ba1-4752-aaf9-689ee1fac145',
      label: 'Mars',
    },
    { id: 'c93dd8ce-9c74-4470-b820-f725d1955747', label: 'Jupiter' },
    {
      id: '267878f9-03f2-43e4-92f3-bb644ef2336c',
      label: 'Venus',
    },
  ],
  timeLimitSeconds: 30,
  currentIndex: 8,
  totalQuestions: 20,
};
