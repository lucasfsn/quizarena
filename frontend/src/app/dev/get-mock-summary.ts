import { GameResult } from '@/app/features/game/types/game-result';
import { delay, Observable, of } from 'rxjs';

export function getMockSummary(): Observable<GameResult> {
  const mockSummary: GameResult = {
    winnerId: '550e8400-e29b-41d4-a716-446655440000',
    players: [
      {
        correctAnswers: 8,
        score: 120,
        position: 1,
        player: {
          id: '550e8400-e29b-41d4-a716-446655440000',
          firstName: 'John',
          lastName: 'Doe',
        },
      },
      {
        correctAnswers: 6,
        score: 90,
        position: 2,
        player: {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          firstName: 'Mark',
          lastName: 'Smith',
        },
      },
      {
        correctAnswers: 4,
        score: 60,
        position: 3,
        player: {
          id: '6c9a1b6e-9b7e-4f2c-8d89-1b5c4d7e9f12',
          firstName: 'Anna',
          lastName: 'Johnson',
        },
      },
      {
        correctAnswers: 3,
        score: 45,
        position: 4,
        player: {
          id: 'a1b2c3d4-e111-4f1a-9c01-111111111111',
          firstName: 'Emily',
          lastName: 'Brown',
        },
      },
      {
        correctAnswers: 3,
        score: 42,
        position: 5,
        player: {
          id: 'b2c3d4e5-e222-4a2b-8d02-222222222222',
          firstName: 'Michael',
          lastName: 'Taylor',
        },
      },
      {
        correctAnswers: 2,
        score: 35,
        position: 6,
        player: {
          id: 'c3d4e5f6-e333-4b3c-7e03-333333333333',
          firstName: 'Sarah',
          lastName: 'Wilson',
        },
      },
      {
        correctAnswers: 2,
        score: 32,
        position: 7,
        player: {
          id: 'd4e5f6a7-e444-4c4d-6f04-444444444444',
          firstName: 'David',
          lastName: 'Martinez',
        },
      },
      {
        correctAnswers: 2,
        score: 30,
        position: 8,
        player: {
          id: 'e5f6a7b8-e555-4d5e-5a05-555555555555',
          firstName: 'Laura',
          lastName: 'Anderson',
        },
      },
      {
        correctAnswers: 1,
        score: 25,
        position: 9,
        player: {
          id: 'f6a7b8c9-e666-4e6f-4b06-666666666666',
          firstName: 'James',
          lastName: 'Thomas',
        },
      },
      {
        correctAnswers: 1,
        score: 22,
        position: 10,
        player: {
          id: 'a7b8c9d0-e777-4f70-3c07-777777777777',
          firstName: 'Olivia',
          lastName: 'Moore',
        },
      },
      {
        correctAnswers: 1,
        score: 20,
        position: 11,
        player: {
          id: 'b8c9d0e1-e888-4071-2d08-888888888888',
          firstName: 'Daniel',
          lastName: 'Jackson',
        },
      },
      {
        correctAnswers: 0,
        score: 15,
        position: 12,
        player: {
          id: 'c9d0e1f2-e999-4172-1e09-999999999999',
          firstName: 'Sophia',
          lastName: 'White',
        },
      },
    ],
  };

  return of(mockSummary).pipe(delay(1000));
}
