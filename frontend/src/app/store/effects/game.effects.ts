import { Toast } from '@/app/core/services/toast/toast';
import { GameSocket } from '@/app/features/game/services/game-socket/game-socket';
import { Game } from '@/app/features/game/services/game/game';
import { ServerMessage } from '@/app/features/game/types/server-message';
import { GameActions, SocketActions } from '@/app/store/actions/game.actions';
import { selectIsHost } from '@/app/store/selectors/game.selectors';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Action, Store } from '@ngrx/store';
import { catchError, map, merge, Observable, of, switchMap, takeUntil, tap } from 'rxjs';

@Injectable()
export class GameEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly gameService = inject(Game);
  private readonly gameSocketService = inject(GameSocket);
  private readonly router = inject(Router);
  private readonly toastService = inject(Toast);

  public createLobby$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.createLobby),
      switchMap(({ quizId }) =>
        this.gameService.createGame(quizId).pipe(
          switchMap((res) =>
            this.establishGameSession(
              res.roomCode,
              GameActions.createLobbySuccess({ gameDetails: res }),
              GameActions.createLobbyFailure,
            ),
          ),
          catchError((err) =>
            of(
              GameActions.createLobbyFailure({
                error: err.message ?? 'An unexpected error occurred',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  public joinLobby$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.joinLobby),
      switchMap(({ roomCode }) =>
        this.gameService.joinGame(roomCode).pipe(
          switchMap((res) =>
            this.establishGameSession(
              res.roomCode,
              GameActions.joinLobbySuccess({ gameDetails: res }),
              GameActions.joinLobbyFailure,
            ),
          ),
          catchError((err) => of(GameActions.joinLobbyFailure({ error: err.message }))),
        ),
      ),
    ),
  );

  public navigateToGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.createLobbySuccess, GameActions.joinLobbySuccess),
        tap(({ gameDetails }) => {
          const targetUrl = `/game/${gameDetails.roomCode}`;
          if (this.router.url !== targetUrl) this.router.navigate(['/game', gameDetails.roomCode]);
        }),
      ),
    { dispatch: false },
  );

  private establishGameSession(
    roomCode: string,
    successAction: Action,
    errorActionCreator: (props: { error: string }) => Action,
  ): Observable<Action> {
    return this.gameSocketService.connect(roomCode).pipe(
      switchMap(() =>
        merge(
          of(successAction),
          this.gameSocketService.loadedMessages.pipe(
            map((message) => this.mapMessageToAction(message)),
          ),
        ),
      ),
      takeUntil(this.actions$.pipe(ofType(GameActions.reset))),
      catchError((err) =>
        of(
          errorActionCreator({
            error: err.message ?? 'Socket connection failed',
          }),
        ),
      ),
    );
  }

  public leave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.leave),
      concatLatestFrom(() => this.store.select(selectIsHost)),
      map(([, isHost]) => (isHost ? GameActions.closeLobby() : GameActions.leaveLobby())),
    ),
  );

  public closeLobby$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.closeLobby),
        tap(() => {
          this.gameSocketService.closeLobby();
          this.gameSocketService.disconnect();
        }),
        map(() => GameActions.reset()),
      ),
    { dispatch: false },
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
        tap(({ questionId, answerId }) =>
          this.gameSocketService.submitAnswer(questionId, answerId),
        ),
      ),
    { dispatch: false },
  );

  public lobbyClosed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SocketActions.lobbyClosed),
        tap(() => {
          this.toastService.info('Host has left the game.');
          this.router.navigate(['/quizzes']);
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
      case 'LOBBY_CLOSE':
        return SocketActions.lobbyClosed();
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
