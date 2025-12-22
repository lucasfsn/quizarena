import { ServerMessage } from '@/app/features/game/types/server-message';
import { environment } from '@/environments/environment';
import { Injectable, signal } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameSocket {
  private rxStomp: RxStomp | undefined;

  private messages = signal<ServerMessage[]>([]);
  public loadedMessages = this.messages.asReadonly();

  public connect(): void {
    if (this.rxStomp?.active) return;

    this.rxStomp = new RxStomp();

    this.rxStomp.configure({
      brokerURL: `${environment.apiUrl}`, // TODO: add ws endpoint
      reconnectDelay: 1000,
    });

    this.rxStomp.activate();

    this.watchTopic();
  }

  public disconnect(): void {
    this.rxStomp?.deactivate();
    this.rxStomp = undefined;
  }

  public send(destination: string, message: unknown): void {
    this.rxStomp?.publish({
      destination,
      body: JSON.stringify(message),
    });
  }

  private watchTopic(): Observable<ServerMessage> {
    return new Observable<ServerMessage>(() =>
      this.rxStomp?.watch('/game').subscribe((message) => {
        const newMessage: ServerMessage = JSON.parse(message.body);
        this.messages.update((oldMessages) => [...oldMessages, newMessage]);
      }),
    );
  }
}
