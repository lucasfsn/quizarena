import { GameSocket } from '@/app/features/game/services/game-socket';
import { ServerMessage } from '@/app/features/game/types/server-message';
import {
  correctAnswerIdReceived,
  GameAction,
  gameError,
  gameFinished,
  joinLobby,
  lobbyUpdated,
  questionReceived,
  submitAnswer,
} from '@/app/store/actions/game.actions';
import { effect, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

@Injectable()
export class GameEffects {
  private readonly store = inject(Store);
  private readonly gameSocket = inject(GameSocket);
  private readonly actions$ = inject(Actions);

  public constructor() {
    effect(() => {
      const messages = this.gameSocket.loadedMessages();

      if (messages.length > 0) {
        const message = messages[messages.length - 1];

        const action = this.mapMessageToAction(message);
        this.store.dispatch(action);
      }
    });
  }

  public connect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(joinLobby),
        tap(() => {
          this.gameSocket.connect();
        }),
      ),
    { dispatch: false },
  );

  public submitAnswer$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(submitAnswer),
        tap(({ answerId }) => {
          this.gameSocket.send('/game/answer', {
            type: 'SUBMIT_ANSWER',
            payload: { answerId },
          });
        }),
      ),
    { dispatch: false },
  );

  private mapMessageToAction(message: ServerMessage): GameAction {
    switch (message.type) {
      case 'LOBBY_UPDATE':
        return lobbyUpdated({ gameDetails: message.payload });
      case 'QUESTION':
        return questionReceived({ question: message.payload });
      case 'CORRECT_ANSWER':
        return correctAnswerIdReceived(message.payload);
      case 'GAME_FINISHED':
        return gameFinished({ result: message.payload });
      case 'ERROR':
        return gameError({ message: message.payload.message });
      default:
        return gameError({ message: 'Unknown message type' });
    }
  }
}
