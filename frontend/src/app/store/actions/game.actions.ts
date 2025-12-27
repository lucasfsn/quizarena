import { GameDetails } from '@/app/features/game/types/game-details';
import { Question } from '@/app/features/game/types/question';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GameActions = createActionGroup({
  source: 'Game',
  events: {
    // Host creates lobby
    'Create Lobby': props<{ quizId: string }>(),
    'Create Lobby Success': props<{ gameDetails: GameDetails }>(),
    'Create Lobby Failure': props<{ error: string }>(),

    // Player joins existing lobby
    'Join Lobby': props<{ roomCode: string }>(),
    'Join Lobby Success': props<{ gameDetails: GameDetails }>(),
    'Join Lobby Failure': props<{ error: string }>(),

    // Leave actions
    Leave: emptyProps(),
    'Close Lobby': emptyProps(),
    'Leave Lobby': emptyProps(),

    // Gameplay
    'Start Game': emptyProps(),
    'Select Answer': props<{ answerId: string | null }>(),
    'Submit Answer': props<{ questionId: string; answerId: string | null }>(),

    // Reset
    Reset: emptyProps(),
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SocketActions = createActionGroup({
  source: 'Socket',
  events: {
    'Lobby Updated': props<{ gameDetails: GameDetails }>(),
    'Lobby Closed': emptyProps(),
    'Question Received': props<{ question: Question }>(),
    'Correct Answer Received': props<{ correctAnswerId: string }>(),
    'Game Finished': props<{ summaryId: string }>(),
    Error: props<{ message: string }>(),
  },
});
