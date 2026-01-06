import { CorrectAnswer } from '@/app/features/game/types/correct-answer';
import { GameDetails } from '@/app/features/game/types/game-details';
import { GameSession } from '@/app/features/game/types/game-session';
import { Question } from '@/app/features/game/types/question';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GameActions = createActionGroup({
  source: 'Game',
  events: {
    'Create Lobby': props<{ quizId: string }>(),
    'Create Lobby Success': props<{ gameDetails: GameDetails }>(),
    'Create Lobby Failure': props<{ error: string }>(),
    'Join Lobby': props<{ roomCode: string }>(),
    'Join Lobby Success': props<{ gameSession: GameSession }>(),
    'Join Lobby Failure': props<{ error: string }>(),
    'Leave': emptyProps(),
    'Close Lobby': emptyProps(),
    'Leave Lobby': emptyProps(),
    'Start Game': emptyProps(),
    'Submit Answer': props<{ answerId: number }>(),
    'Reset': emptyProps(),
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SocketActions = createActionGroup({
  source: 'Socket',
  events: {
    'Lobby Updated': props<{ gameDetails: GameDetails }>(),
    'Lobby Closed': emptyProps(),
    'Question Received': props<{ question: Question }>(),
    'Correct Answer Received': props<{ correctAnswer: CorrectAnswer }>(),
    'Game Finished': props<{ summaryId: string }>(),
    'Error': props<{ message: string }>(),
  },
});
