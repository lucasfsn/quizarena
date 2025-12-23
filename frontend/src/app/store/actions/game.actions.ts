import { GameDetails } from '@/app/features/game/types/game-details';
import { GameResult } from '@/app/features/game/types/game-result';
import { Question } from '@/app/features/game/types/question';
import { createAction, props } from '@ngrx/store';

export type GameAction =
  | ReturnType<typeof lobbyUpdated>
  | ReturnType<typeof questionReceived>
  | ReturnType<typeof correctAnswerIdReceived>
  | ReturnType<typeof gameFinished>
  | ReturnType<typeof gameError>;

// Lobby Actions
export const joinLobby = createAction(
  '[Lobby] Join',
  props<{ lobbyId: string; playerName: string }>(),
);
export const lobbyUpdated = createAction(
  '[Socket] Lobby Updated',
  props<{ gameDetails: GameDetails }>(),
);
export const leaveLobby = createAction('[Lobby] Leave');

// Question actions
export const questionReceived = createAction(
  '[Socket] Question Received',
  props<{ question: Question }>(),
);
export const answerSelected = createAction(
  '[Question] Answer Selected',
  props<{ answerId: string | null }>(),
);
export const submitAnswer = createAction(
  '[Question] Submit Answer',
  props<{ answerId: string | null }>(),
);
export const correctAnswerIdReceived = createAction(
  '[Socket] Correct Answer Id Received',
  props<{ correctAnswerId: string }>(),
);

// Game finished actions
export const gameFinished = createAction('[Socket] Game Finished', props<{ result: GameResult }>());

// Socket connection actions
export const socketConnected = createAction('[Socket] Connected');
export const socketDisconnected = createAction('[Socket] Disconnected');
export const gameError = createAction('[Socket] Error', props<{ message: string }>());
export const resetGame = createAction('[Game] Reset');
