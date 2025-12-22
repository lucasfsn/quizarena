import { AnswerResults } from '@/app/features/game/types/answer-results';
import { GameResult } from '@/app/features/game/types/game-result';
import { Lobby } from '@/app/features/game/types/lobby';
import { Question } from '@/app/features/game/types/question';
import {
  answerResultsReceived,
  gameError,
  gameFinished,
  lobbyUpdated,
  questionReceived,
  resetGame,
  socketConnected,
} from '@/app/store/actions/game.actions';
import { createReducer, on } from '@ngrx/store';

enum GameStatus {
  IDLE = 'idle',
  LOBBY = 'lobby',
  QUESTION = 'question',
  ANSWERS = 'answers',
  FINISHED = 'finished',
  ERROR = 'error',
}

interface GameState {
  lobby: Lobby | null;
  question: Question | null;
  answers: AnswerResults | null;
  gameResult: GameResult | null;
  status: GameStatus;
  error?: string;
}

export const initialState: GameState = {
  lobby: null,
  question: null,
  answers: null,
  gameResult: null,
  status: GameStatus.IDLE,
  error: undefined,
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
  on(answerResultsReceived, (state, { results }) => ({
    ...state,
    answers: results,
    status: GameStatus.ANSWERS,
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
