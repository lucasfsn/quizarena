import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GameState } from '@/app/store/reducers/game.reducers';

export const selectGameState = createFeatureSelector<GameState>('game');

export const selectSelectedAnswerId = createSelector(
  selectGameState,
  (state) => state.selectedAnswerId,
);

export const selectHasSubmitted = createSelector(selectGameState, (state) => state.hasSubmitted);

export const selectGameStatus = createSelector(selectGameState, (state) => state.status);

export const selectAnswerResults = createSelector(selectGameState, (state) => state.answers);
