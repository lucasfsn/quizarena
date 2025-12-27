import { GameDetails } from '@/app/features/game/types/game-details';
import { Question } from '@/app/features/game/types/question';
import { GameActions, SocketActions } from '@/app/store/actions/game.actions';
import { createReducer, on } from '@ngrx/store';

export enum GameStatus {
  IDLE = 'idle',
  CREATING = 'creating',
  JOINING = 'joining',
  LOBBY = 'lobby',
  QUESTION = 'question',
  ANSWER = 'answer',
  FINISHED = 'finished',
  ERROR = 'error',
}

export interface GameState {
  isHost: boolean;
  gameDetails: GameDetails | null;
  question: Question | null;
  correctAnswerId: string | null;
  status: GameStatus;
  error: string | null;
  selectedAnswerId: string | null;
  summaryId: string | null;
  hasSubmitted: boolean;
}

export const initialState: GameState = {
  isHost: false,
  gameDetails: null,
  question: null,
  correctAnswerId: null,
  status: GameStatus.IDLE,
  error: null,
  selectedAnswerId: null,
  summaryId: null,
  hasSubmitted: false,
};

export const gameReducer = createReducer(
  initialState,
  on(GameActions.createAndJoinLobby, (state) => ({
    ...state,
    status: GameStatus.CREATING,
    isHost: true,
    error: null,
  })),

  on(GameActions.createLobbySuccess, (state, { gameDetails }) => ({
    ...state,
    gameDetails,
    status: GameStatus.LOBBY,
  })),

  on(GameActions.createLobbyFailure, (state, { error }) => ({
    ...state,
    status: GameStatus.ERROR,
    error,
  })),

  on(GameActions.joinLobby, (state) => ({
    ...state,
    status: GameStatus.JOINING,
    isHost: false,
    error: null,
  })),

  on(GameActions.joinLobbyFailure, (state, { error }) => ({
    ...state,
    status: GameStatus.ERROR,
    error,
  })),

  on(SocketActions.lobbyUpdated, (state, { gameDetails }) => ({
    ...state,
    gameDetails,
    status: GameStatus.LOBBY,
  })),

  on(SocketActions.questionReceived, (state, { question }) => ({
    ...state,
    question,
    correctAnswerId: null,
    selectedAnswerId: null,
    hasSubmitted: false,
    status: GameStatus.QUESTION,
  })),

  on(GameActions.selectAnswer, (state, { answerId }) => ({
    ...state,
    selectedAnswerId: answerId,
  })),

  on(GameActions.submitAnswer, (state) => ({
    ...state,
    hasSubmitted: true,
  })),

  on(SocketActions.correctAnswerReceived, (state, { correctAnswerId }) => ({
    ...state,
    correctAnswerId,
    status: GameStatus.ANSWER,
  })),

  on(SocketActions.gameFinished, (state, { summaryId }) => ({
    ...state,
    summaryId,
    status: GameStatus.FINISHED,
  })),

  on(SocketActions.error, (state, { message }) => ({
    ...state,
    error: message,
    status: GameStatus.ERROR,
  })),

  on(GameActions.reset, () => initialState),
);
