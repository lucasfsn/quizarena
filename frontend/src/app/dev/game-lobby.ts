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
      {
        user: {
          id: 'a1f3c6d2-2b3e-4a7f-9c1a-8f6b3a9d0e11',
          firstName: 'Sophia',
          lastName: 'Lopez',
          username: 'sophia_lopez',
        },
        score: 0,
        isConnected: true,
      },
      {
        user: {
          id: 'b2d4e8f1-9c3b-4f2a-8b1e-5c6d7f8a9b22',
          firstName: 'Liam',
          lastName: 'Nguyen',
          username: 'liam_nguyen',
        },
        score: 0,
        isConnected: true,
      },
      {
        user: {
          id: 'c3e5f9a0-1d4c-42b3-9a2b-6d7e8f9b0c33',
          firstName: 'Ava',
          lastName: 'Patel',
          username: 'ava_patel',
        },
        score: 0,
        isConnected: true,
      },
      {
        user: {
          id: 'd4f6a0b1-2e5d-4c34-8b3c-7e8f9a0b1c44',
          firstName: 'Noah',
          lastName: 'Kim',
          username: 'noah_kim',
        },
        score: 0,
        isConnected: false,
      },
      {
        user: {
          id: 'e5a7b1c2-3f6e-4d45-9c4d-8f0a1b2c3d55',
          firstName: 'Emma',
          lastName: 'Wilson',
          username: 'emma_wilson',
        },
        score: 0,
        isConnected: true,
      },
      {
        user: {
          id: 'f6b8c2d3-4a7f-4e56-8d5e-9a1b2c3d4e66',
          firstName: 'Oliver',
          lastName: 'Garcia',
          username: 'oliver_garcia',
        },
        score: 0,
        isConnected: true,
      },
      {
        user: {
          id: '07c9d3e4-5b8a-4f67-9e6f-0b2c3d4e5f77',
          firstName: 'Isabella',
          lastName: 'Martinez',
          username: 'isabella_martinez',
        },
        score: 0,
        isConnected: true,
      },
      {
        user: {
          id: '18dae4f5-6c9b-4g78-0f7g-1c3d4e5f6g88',
          firstName: 'Lucas',
          lastName: 'Brown',
          username: 'lucas_brown',
        },
        score: 0,
        isConnected: false,
      },
      {
        user: {
          id: '29ebf506-7d0c-48h9-1g8h-2d4e5f6g7h99',
          firstName: 'Mia',
          lastName: 'Davis',
          username: 'mia_davis',
        },
        score: 0,
        isConnected: true,
      },
    ],
    phase: 'lobby',
    hostId: '79d544be-253c-4a71-abbe-225fcc25b5e8',
  },
};
