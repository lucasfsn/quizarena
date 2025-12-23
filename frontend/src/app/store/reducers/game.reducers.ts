import { GameDetails } from '@/app/features/game/types/game-details';
import { GameResult } from '@/app/features/game/types/game-result';
import { Question } from '@/app/features/game/types/question';
import {
  answerSelected,
  correctAnswerIdReceived,
  gameError,
  gameFinished,
  lobbyUpdated,
  questionReceived,
  resetGame,
  socketConnected,
  submitAnswer,
} from '@/app/store/actions/game.actions';
import { createReducer, on } from '@ngrx/store';

export enum GameStatus {
  IDLE = 'idle',
  LOBBY = 'lobby',
  QUESTION = 'question',
  ANSWER = 'answer',
  FINISHED = 'finished',
  ERROR = 'error',
}

export interface GameState {
  gameDetails: GameDetails | null;
  question: Question | null;
  correctAnswerId: string | null;
  gameResult: GameResult | null;
  status: GameStatus;
  error?: string;
  selectedAnswerId: string | null;
  hasSubmitted: boolean;
}

export const initialState: GameState = {
  gameDetails: null,
  question: null,
  correctAnswerId: null,
  gameResult: null,
  status: GameStatus.IDLE,
  error: undefined,
  selectedAnswerId: null,
  hasSubmitted: false,
};

export const gameReducer = createReducer(
  initialState,
  on(socketConnected, (state) => ({
    ...state,
    status: GameStatus.LOBBY,
  })),
  on(lobbyUpdated, (state, { gameDetails }) => ({
    ...state,
    gameDetails,
    status: GameStatus.LOBBY,
  })),
  on(questionReceived, (state, { question }) => ({
    ...state,
    question,
    correctAnswer: null,
    status: GameStatus.QUESTION,
  })),
  on(answerSelected, (state, { answerId }) => ({
    ...state,
    selectedAnswerId: answerId,
  })),
  on(submitAnswer, (state) => ({
    ...state,
    hasSubmitted: true,
  })),
  on(correctAnswerIdReceived, (state, { correctAnswerId }) => ({
    ...state,
    correctAnswerId,
    status: GameStatus.ANSWER,
  })),
  on(gameFinished, (state, { result }) => ({
    ...state,
    gameResult: result,
    status: GameStatus.FINISHED,
  })),
  on(gameError, (state, { message }) => ({
    ...state,
    error: message,
    status: GameStatus.ERROR,
  })),
  on(resetGame, () => initialState),
);
