import { GameState } from '@/app/store/reducers/game.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectGameState = createFeatureSelector<GameState>('game');

export const selectGameStatus = createSelector(selectGameState, (state) => state.status);

export const selectIsHost = createSelector(selectGameState, (state) => state.isHost);

export const selectGameDetails = createSelector(selectGameState, (state) => state.gameDetails);

export const selectRoomCode = createSelector(
  selectGameState,
  (state) => state.gameDetails?.roomCode ?? null,
);

export const selectQuestion = createSelector(selectGameState, (state) => state.question);

export const selectSummaryId = createSelector(selectGameState, (state) => state.summaryId);

export const selectSubmittedAnswerId = createSelector(
  selectGameState,
  (state) => state.submittedAnswerId,
);

export const selectCorrectAnswerId = createSelector(
  selectGameState,
  (state) => state.correctAnswerId,
);

export const selectError = createSelector(selectGameState, (state) => state.error);
