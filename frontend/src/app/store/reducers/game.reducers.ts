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
  gameId: string | null;
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
  gameId: null,
  scores: null,
  error: null,
};

export const gameReducer = createReducer(
  initialState,
  on(GameActions.createLobby, () => ({
    ...initialState,
    status: GameStatus.LOADING,
    isHost: true,
  })),
  on(GameActions.joinLobby, GameActions.getGameSession, () => ({
    ...initialState,
    status: GameStatus.LOADING,
  })),
  on(
    GameActions.createLobbySuccess,
    GameActions.joinLobbySuccess,
    (state, { gameDetails }) => ({
      ...state,
      gameDetails,
      status: GameStatus.LOBBY,
      error: null,
    })
  ),
  on(
    GameActions.createLobbyFailure,
    GameActions.joinLobbyFailure,
    (state, { error }) => ({
      ...state,
      status: GameStatus.ERROR,
      error,
    })
  ),
  on(GameActions.getGameSessionSuccess, (state, { gameSession }) => ({
    ...state,
    gameDetails: gameSession.gameDetailsResponse,
    status: mapBackendStatus(gameSession.gameStatus),
    question: gameSession.currentQuestion || null,
    correctAnswerId: gameSession.correctAnswerId || null,
    submittedAnswerId: gameSession.submittedAnswerId || null,
    isHost: gameSession.host,
    error: null,
  })),
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
  on(SocketActions.gameFinished, (state, { gameId }) => ({
    ...state,
    gameId,
    status: GameStatus.FINISHED,
  })),
  on(SocketActions.error, (state, { message }) => ({
    ...state,
    error: message,
    status: GameStatus.ERROR,
  })),
  on(GameActions.reset, () => initialState)
);

function mapBackendStatus(backendStatus: string): GameStatus {
  const statusMap: Record<string, GameStatus> = {
    LOBBY: GameStatus.LOBBY,
    QUIZ: GameStatus.QUESTION,
    SHOWING_RESULTS: GameStatus.ANSWER,
  };

  return statusMap[backendStatus] ?? GameStatus.ERROR;
}
