import { GameDetails } from '@/app/features/game/types/game-details';
import { Question } from '@/app/features/game/types/question';
import { Score } from '@/app/features/game/types/score';
import { GameActions, SocketActions } from '@/app/store/actions/game.actions';
import { createReducer, on } from '@ngrx/store';

export enum GameStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOBBY = 'LOBBY',
  QUESTION = 'QUESTION',
  ANSWER = 'ANSWER',
  FINISHED = 'FINISHED',
  ERROR = 'ERROR',
}

export interface GameState {
  status: GameStatus;
  isHost: boolean;
  gameDetails: GameDetails | null;
  question: Question | null;
  submittedAnswerId: number | null;
  correctAnswerId: number | null;
  summaryId: string | null;
  scores: Score[] | null;
  error: string | null;
}

export const initialState: GameState = {
  status: GameStatus.IDLE,
  isHost: false,
  gameDetails: null,
  question: null,
  submittedAnswerId: null,
  correctAnswerId: null,
  summaryId: null,
  scores: null,
  error: null,
};

export const gameReducer = createReducer(
  initialState,
  on(GameActions.createLobby, GameActions.joinLobby, (state) => ({
    ...state,
    status: GameStatus.LOADING,
    isHost: true,
  })),
  on(GameActions.createLobbySuccess, (state, { gameDetails }) => ({
    ...state,
    gameDetails,
    status: GameStatus.LOBBY,
    error: null,
  })),
  on(GameActions.joinLobbySuccess, (state, { gameSession }) => ({
    ...state,
    gameDetails: gameSession.gameDetails,
    status: gameSession.status,
    question: gameSession.currentQuestion || null,
    correctAnswerId: gameSession.correctAnswerId || null,
    error: null,
  })),
  on(
    GameActions.createLobbyFailure,
    GameActions.joinLobbyFailure,
    (state, { error }) => ({
      ...state,
      status: GameStatus.ERROR,
      error,
    })
  ),
  on(SocketActions.lobbyUpdated, (state, { gameDetails }) => ({
    ...state,
    gameDetails,
    status: GameStatus.LOBBY,
  })),
  on(SocketActions.lobbyClosed, () => initialState),
  on(SocketActions.questionReceived, (state, { question }) => ({
    ...state,
    question,
    correctAnswerId: null,
    submittedAnswerId: null,
    status: GameStatus.QUESTION,
  })),
  on(GameActions.submitAnswer, (state, { answerId }) => ({
    ...state,
    submittedAnswerId: answerId,
  })),

  on(SocketActions.correctAnswerReceived, (state, { correctAnswer }) => ({
    ...state,
    correctAnswerId: correctAnswer.correctAnswerId,
    scores: correctAnswer.players,
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
  on(GameActions.reset, () => initialState)
);
