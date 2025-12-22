import { Lobby } from '@/app/features/game/types/lobby';
import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';

export const MOCK_GAME_LOBBY: Lobby = {
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
      player: {
        id: '79d544be-253c-4a71-abbe-225fcc25b5e8',
        firstName: 'John',
        lastName: 'Doe',
      },
      isHost: true,
      isConnected: true,
    },
    {
      player: {
        id: '7386dc33-0337-4827-b34d-a0c79cda88c2',
        firstName: 'Jack',
        lastName: 'Smith',
      },
      isHost: false,
      isConnected: true,
    },
    {
      player: {
        id: 'a1f3c6d2-2b3e-4a7f-9c1a-8f6b3a9d0e11',
        firstName: 'Sophia',
        lastName: 'Lopez',
      },
      isHost: false,
      isConnected: true,
    },
    {
      player: {
        id: 'b2d4e8f1-9c3b-4f2a-8b1e-5c6d7f8a9b22',
        firstName: 'Liam',
        lastName: 'Nguyen',
      },
      isHost: false,
      isConnected: true,
    },
    {
      player: {
        id: 'c3e5f9a0-1d4c-42b3-9a2b-6d7e8f9b0c33',
        firstName: 'Ava',
        lastName: 'Patel',
      },
      isHost: false,
      isConnected: true,
    },
    {
      player: {
        id: 'd4f6a0b1-2e5d-4c34-8b3c-7e8f9a0b1c44',
        firstName: 'Noah',
        lastName: 'Kim',
      },
      isHost: false,
      isConnected: false,
    },
    {
      player: {
        id: 'e5a7b1c2-3f6e-4d45-9c4d-8f0a1b2c3d55',
        firstName: 'Emma',
        lastName: 'Wilson',
      },
      isHost: false,
      isConnected: true,
    },
    {
      player: {
        id: 'f6b8c2d3-4a7f-4e56-8d5e-9a1b2c3d4e66',
        firstName: 'Oliver',
        lastName: 'Garcia',
      },
      isHost: false,
      isConnected: true,
    },
    {
      player: {
        id: '07c9d3e4-5b8a-4f67-9e6f-0b2c3d4e5f77',
        firstName: 'Isabella',
        lastName: 'Martinez',
      },
      isHost: false,
      isConnected: true,
    },
    {
      player: {
        id: '18dae4f5-6c9b-4g78-0f7g-1c3d4e5f6g88',
        firstName: 'Lucas',
        lastName: 'Brown',
      },
      isHost: false,
      isConnected: false,
    },
    {
      player: {
        id: '29ebf506-7d0c-48h9-1g8h-2d4e5f6g7h99',
        firstName: 'Mia',
        lastName: 'Davis',
      },
      isHost: false,
      isConnected: true,
    },
  ],
  hostId: '79d544be-253c-4a71-abbe-225fcc25b5e8',
  isStarted: false,
};
