import { AnswerResults } from '@/app/features/game/types/answer-results';
import { GameResult } from '@/app/features/game/types/game-result';
import { Lobby } from '@/app/features/game/types/lobby';
import { Question } from '@/app/features/game/types/question';
import {
  answerResultsReceived,
  answerSelected,
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
  lobby: Lobby | null;
  question: Question | null;
  answers: AnswerResults | null;
  gameResult: GameResult | null;
  status: GameStatus;
  error?: string;
  selectedAnswerId: string | null;
  hasSubmitted: boolean;
}

export const initialState: GameState = {
  lobby: null,
  question: null,
  answers: null,
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
  on(lobbyUpdated, (state, { lobby }) => ({
    ...state,
    lobby,
    status: GameStatus.LOBBY,
  })),
  on(questionReceived, (state, { question }) => ({
    ...state,
    question,
    answers: null,
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
  on(answerResultsReceived, (state, { results }) => ({
    ...state,
    answers: results,
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
