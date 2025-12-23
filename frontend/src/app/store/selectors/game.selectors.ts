import { GameState } from '@/app/store/reducers/game.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectGameState = createFeatureSelector<GameState>('game');

export const selectSelectedAnswerId = createSelector(
  selectGameState,
  (state) => state.selectedAnswerId,
);

export const selectHasSubmitted = createSelector(selectGameState, (state) => state.hasSubmitted);

export const selectGameStatus = createSelector(selectGameState, (state) => state.status);

export const selectCorrectAnswerId = createSelector(
  selectGameState,
  (state) => state.correctAnswerId,
);
