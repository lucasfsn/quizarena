import { ServerMessage } from '@/app/features/game/types/server-message';
import { environment } from '@/environments/environment';
import { Injectable, OnDestroy } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { map, Observable, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameSocket implements OnDestroy {
  private rxStomp: RxStomp | null = null;
  private roomCode: string | null = null;
  private subscriptions: Subscription[] = [];

  private messages$ = new Subject<ServerMessage>();
  public loadedMessages = this.messages$.asObservable();

  public connect(roomCode: string): Observable<void> {
    if (this.rxStomp?.active && this.roomCode !== roomCode) {
      this.disconnect();
    }

    this.roomCode = roomCode;

    return new Observable<void>((sub) => {
      if (this.rxStomp?.active) {
        sub.next();
        sub.complete();

        return;
      }

      this.rxStomp = new RxStomp();

      this.rxStomp.configure({
        brokerURL: `${environment.wsUrl}`,
        reconnectDelay: 1000,
      });

      this.rxStomp.activate();

      const connectedSub = this.rxStomp.connected$.subscribe(() => {
        const roomSub = this.rxStomp!.watch(`/topic/game/${roomCode}`)
          .pipe(map((msg) => JSON.parse(msg.body) as ServerMessage))
          .subscribe((message) => this.messages$.next(message));

        const errorSub = this.rxStomp!.watch('/user/queue/errors')
          .pipe(map((msg) => JSON.parse(msg.body) as ServerMessage))
          .subscribe((message) => this.messages$.next(message));

        this.subscriptions.push(roomSub, errorSub);

        sub.next();
        sub.complete();
      });

      this.subscriptions.push(connectedSub);
    });
  }

  public disconnect(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions = [];
    this.rxStomp?.deactivate();
    this.rxStomp = null;
    this.roomCode = null;

    this.messages$.complete();
    this.messages$ = new Subject<ServerMessage>();
    this.loadedMessages = this.messages$.asObservable();
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

  public submitAnswer(questionId: string, answerId: string | null): void {
    this.send('/app/game/answer', {
      roomCode: this.roomCode,
      questionId,
      answerId,
    });
  }

  private send(destination: string, body: unknown): void {
    this.rxStomp?.publish({
      destination,
      body: JSON.stringify(body),
    });
  }

  public ngOnDestroy(): void {
    this.disconnect();
  }
}
