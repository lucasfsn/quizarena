import { LobbyMessage } from '@/app/features/game/types/lobby';
import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';

export const MOCK_GAME_LOBBY: LobbyMessage = {
  type: 'lobby',
  payload: {
    roomCode: 'ABC123',
    quiz: {
      id: '1',
      title: 'The World of AI Ethics',
      questionsCount: 10,
      category: QuizCategory.COMMUNITY,
      author: 'John Doe',
    },
    players: [
      {
        user: {
          id: '79d544be-253c-4a71-abbe-225fcc25b5e8',
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
        },
        score: 0,
        isHost: true,
        isConnected: true,
      },
      {
        user: {
          id: '7386dc33-0337-4827-b34d-a0c79cda88c2',
          firstName: 'Jack',
          lastName: 'Smith',
          username: 'jack_smith',
        },
        score: 0,
        isConnected: true,
      },
    ],
    phase: 'lobby',
    hostId: '79d544be-253c-4a71-abbe-225fcc25b5e8',
  },
};
