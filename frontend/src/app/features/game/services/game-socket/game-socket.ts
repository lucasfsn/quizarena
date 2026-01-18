import { ServerMessage } from '@/app/features/game/types/server-message';
import { environment } from '@/environments/environment';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RxStomp } from '@stomp/rx-stomp';
import Keycloak from 'keycloak-js';
import {
  BehaviorSubject,
  map,
  merge,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameSocket {
  private readonly keycloak = inject(Keycloak);
  private readonly destroyRef = inject(DestroyRef);

  private rxStomp: RxStomp | null = null;
  private roomCode: string | null = null;

  private readonly connectionSubject$ = new BehaviorSubject<boolean>(false);
  public readonly isConnected$ = this.connectionSubject$.asObservable();

  private readonly messagesSubject = new Subject<ServerMessage>();
  public readonly messages$ = this.messagesSubject.asObservable();

  public connect(roomCode: string): void {
    if (this.rxStomp?.active && this.roomCode === roomCode) return;
    if (this.rxStomp) this.disconnect();

    this.roomCode = roomCode;
    this.rxStomp = new RxStomp();

    this.rxStomp.configure({
      brokerURL: `${environment.wsUrl}`,
      reconnectDelay: 1000,
      connectHeaders: {
        Authorization: `Bearer ${this.keycloak.token}`,
      },
    });

    this.rxStomp.connected$
      .pipe(
        tap(() => this.connectionSubject$.next(true)),
        switchMap(() =>
          merge(
            this.watchTopic(`/topic/game/${roomCode}`),
            this.watchTopic('/user/queue/errors')
          )
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (message) => this.messagesSubject.next(message),
        error: () => this.connectionSubject$.next(false),
      });

    this.rxStomp.activate();
  }

  public disconnect(): void {
    this.rxStomp?.deactivate();
    this.rxStomp = null;
    this.roomCode = null;
  }

  public joinGame(roomCode: string): void {
    this.send('/app/game/join', { roomCode });
  }

  public closeLobby(): void {
    this.send('/app/game/close', { roomCode: this.roomCode });
  }

  public leaveGame(): void {
    this.send('/app/game/leave', { roomCode: this.roomCode });
  }

  public startGame(): void {
    this.send('/app/game/start', { roomCode: this.roomCode });
  }

  public submitAnswer(answerId: number): void {
    this.send('/app/game/answer', {
      roomCode: this.roomCode,
      answerId,
    });
  }

  private send(destination: string, body: unknown): void {
    if (!this.rxStomp?.active) return;

    this.rxStomp.publish({ destination, body: JSON.stringify(body) });
  }

  private watchTopic(topic: string): Observable<ServerMessage> {
    return this.rxStomp!.watch(topic).pipe(
      map((message) => JSON.parse(message.body) as ServerMessage)
    );
  }
}
