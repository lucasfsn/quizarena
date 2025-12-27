import { GameSocket } from '@/app/features/game/services/game-socket/game-socket';
import { Game } from '@/app/features/game/services/game/game';
import { ServerMessage } from '@/app/features/game/types/server-message';
import { GameActions, SocketActions } from '@/app/store/actions/game.actions';
import { selectIsHost } from '@/app/store/selectors/game.selectors';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Action, Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, takeUntil, tap } from 'rxjs';

@Injectable()
export class GameEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly gameService = inject(Game);
  private readonly gameSocketService = inject(GameSocket);

  public createLobby$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.createAndJoinLobby),
      switchMap(({ quizId }) => this.handleGameCreation(quizId)),
    ),
  );

  private handleGameCreation(quizId: string): Observable<Action> {
    return this.gameService.createGame(quizId).pipe(
      switchMap((res) =>
        this.gameSocketService.connect(res.roomCode).pipe(
          map(() =>
            GameActions.createLobbySuccess({
              roomCode: res.roomCode,
              gameDetails: res,
            }),
          ),
        ),
      ),
      catchError((err) =>
        of(
          GameActions.createLobbyFailure({
            error: err.message ?? 'An unexpected has occured',
          }),
        ),
      ),
    );
  }

  public joinLobby$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.joinLobby),
      switchMap(({ roomCode }) =>
        this.gameSocketService.connect(roomCode).pipe(
          tap(() => this.gameSocketService.joinGame(roomCode)),
          switchMap(() => this.gameSocketService.loadedMessages),
          takeUntil(this.actions$.pipe(ofType(GameActions.leave, GameActions.reset))),
          map((message) => this.mapMessageToAction(message)),
          catchError((error) => of(GameActions.joinLobbyFailure({ error: error.message }))),
        ),
      ),
    ),
  );

  public listenToMessagesAfterCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.createLobbySuccess),
      switchMap(() =>
        this.gameSocketService.loadedMessages.pipe(
          map((message) => this.mapMessageToAction(message)),
          takeUntil(this.actions$.pipe(ofType(GameActions.leave, GameActions.reset))),
        ),
      ),
    ),
  );

  public leave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.leave),
      concatLatestFrom(() => this.store.select(selectIsHost)),
      map(([, isHost]) => (isHost ? GameActions.closeLobby() : GameActions.leaveLobby())),
    ),
  );

  public leaveLobby$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.leaveLobby),
      tap(() => {
        this.gameSocketService.leaveGame();
        this.gameSocketService.disconnect();
      }),
      map(() => GameActions.reset()),
    ),
  );

  public startGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.startGame),
        tap(() => this.gameSocketService.startGame()),
      ),
    { dispatch: false },
  );

  public submitAnswer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.submitAnswer),
        tap(({ questionId, answerId }) => {
          this.gameSocketService.submitAnswer(questionId, answerId);
        }),
      ),
    { dispatch: false },
  );

  private mapMessageToAction(
    message: ServerMessage,
  ): ReturnType<(typeof SocketActions)[keyof typeof SocketActions]> {
    switch (message.type) {
      case 'LOBBY_UPDATE':
        return SocketActions.lobbyUpdated({ gameDetails: message.payload });
      case 'QUESTION':
        return SocketActions.questionReceived({ question: message.payload });
      case 'CORRECT_ANSWER':
        return SocketActions.correctAnswerReceived({
          correctAnswerId: message.payload.correctAnswerId,
        });
      case 'GAME_FINISHED':
        return SocketActions.gameFinished({ summaryId: message.payload.summaryId });
      case 'ERROR':
        return SocketActions.error({ message: message.payload.message });
      default:
        return SocketActions.error({ message: 'Unknown message type' });
    }
  }
}
