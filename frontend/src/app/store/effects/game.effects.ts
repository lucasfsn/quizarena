import { GameSocket } from '@/app/features/game/services/game-socket/game-socket';
import { Game } from '@/app/features/game/services/game/game';
import { GameDetails } from '@/app/features/game/types/game-details';
import { GameSession } from '@/app/features/game/types/game-session';
import { ServerMessage } from '@/app/features/game/types/server-message';
import { Toast } from '@/app/shared/services/toast/toast';
import { GameActions, SocketActions } from '@/app/store/actions/game.actions';
import { selectIsHost } from '@/app/store/selectors/game.selectors';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Action, Store } from '@ngrx/store';
import {
  catchError,
  map,
  merge,
  Observable,
  of,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

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
          switchMap((res: GameDetails) =>
            this.establishGameSession(
              res.roomCode,
              GameActions.createLobbySuccess({ gameDetails: res }),
              GameActions.createLobbyFailure
            )
          ),
          catchError((err) =>
            of(
              GameActions.createLobbyFailure({
                error: err.message ?? 'An unexpected error occurred',
              })
            )
          )
        )
      )
    )
  );

  public createLobbyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.createLobbyFailure),
        tap(({ error }) =>
          this.toastService.error(error, 'Failed to create game.')
        )
      ),
    { dispatch: false }
  );

  public joinLobby$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.joinLobby),
      switchMap(({ roomCode }) =>
        this.gameService.joinGame(roomCode).pipe(
          switchMap((res: GameDetails) =>
            this.establishGameSession(
              res.roomCode,
              GameActions.joinLobbySuccess({ gameDetails: res }),
              GameActions.joinLobbyFailure
            )
          ),
          catchError((err) =>
            of(GameActions.joinLobbyFailure({ error: err.message }))
          )
        )
      )
    )
  );

  public joinLobbyFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.joinLobbyFailure),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  public getGameSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.getGameSession),
      switchMap(({ roomCode }) =>
        this.gameService.getGameSession(roomCode).pipe(
          switchMap((session: GameSession) =>
            this.establishGameSession(
              session.gameDetailsResponse.roomCode,
              GameActions.getGameSessionSuccess({ gameSession: session }),
              GameActions.joinLobbyFailure
            )
          ),
          catchError((err) =>
            of(GameActions.joinLobbyFailure({ error: err.message }))
          )
        )
      )
    )
  );

  public navigateToGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.createLobbySuccess, GameActions.joinLobbySuccess),
        tap(({ gameDetails }) => {
          this.router.navigate(['/game', gameDetails.roomCode]);
        })
      ),
    { dispatch: false }
  );

  private establishGameSession(
    roomCode: string,
    successAction: Action,
    errorActionCreator: (props: { error: string }) => Action
  ): Observable<Action> {
    return this.gameSocketService.connect(roomCode).pipe(
      switchMap(() =>
        merge(
          of(successAction),
          this.gameSocketService.loadedMessages.pipe(
            map((message) => this.mapMessageToAction(message))
          )
        )
      ),
      takeUntil(this.actions$.pipe(ofType(GameActions.reset))),
      catchError((err) =>
        of(
          errorActionCreator({
            error: err.message ?? 'Socket connection failed',
          })
        )
      )
    );
  }

  public leave$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.leave),
      concatLatestFrom(() => this.store.select(selectIsHost)),
      map(([, isHost]) =>
        isHost ? GameActions.closeLobby() : GameActions.leaveLobby()
      )
    )
  );

  public closeLobby$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.closeLobby),
      tap(() => {
        this.gameSocketService.closeLobby();
        this.gameSocketService.disconnect();
        this.router.navigate(['/quizzes']);
      }),
      map(() => GameActions.reset())
    )
  );

  public leaveLobby$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GameActions.leaveLobby),
      tap(() => {
        this.gameSocketService.leaveGame();
        this.gameSocketService.disconnect();
        this.router.navigate(['/quizzes']);
      }),
      map(() => GameActions.reset())
    )
  );

  public startGame$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.startGame),
        tap(() => this.gameSocketService.startGame())
      ),
    { dispatch: false }
  );

  public submitAnswer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(GameActions.submitAnswer),
        tap(({ answerId }) => this.gameSocketService.submitAnswer(answerId))
      ),
    { dispatch: false }
  );

  public lobbyClosed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SocketActions.lobbyClosed),
      tap(() => {
        this.gameSocketService.disconnect();
        this.toastService.info('Host has closed the game.');
        this.router.navigate(['/quizzes']);
      }),
      map(() => GameActions.reset())
    )
  );

  public gameFinished$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SocketActions.gameFinished),
        tap(() => {
          this.gameSocketService.disconnect();
        })
      ),
    { dispatch: false }
  );

  private mapMessageToAction(message: ServerMessage): Action {
    switch (message.eventType) {
      case 'LOBBY_UPDATE':
        return SocketActions.lobbyUpdated({ gameDetails: message.payload });
      case 'LOBBY_CLOSE':
        return SocketActions.lobbyClosed();
      case 'QUESTION':
        return SocketActions.questionReceived({ question: message.payload });
      case 'CORRECT_ANSWER':
        return SocketActions.correctAnswerReceived({
          correctAnswer: message.payload,
        });
      case 'GAME_FINISHED':
        return SocketActions.gameFinished({
          gameId: message.payload.gameId,
        });
      case 'ERROR':
        return SocketActions.error({ message: message.payload.message });
      default:
        return SocketActions.error({ message: 'Unknown message type' });
    }
  }
}
