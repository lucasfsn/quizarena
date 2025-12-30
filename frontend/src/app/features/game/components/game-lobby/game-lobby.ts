import { GameDetails } from '@/app/features/game/types/game-details';
import { Button } from '@/app/shared/components/button/button';
import { GameLobbyImage } from '@/app/shared/components/svg/game-lobby-image';
import { Toast } from '@/app/shared/services/toast/toast';
import { GameActions } from '@/app/store/actions/game.actions';
import { selectIsHost } from '@/app/store/selectors/game.selectors';
import { Component, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-game-lobby',
  imports: [Button, GameLobbyImage, Carousel],
  templateUrl: './game-lobby.html',
  styleUrl: './game-lobby.scss',
})
export class GameLobby {
  public game = input.required<GameDetails>();

  private readonly toastService = inject(Toast);
  private readonly store = inject(Store);

  protected readonly isHost = this.store.selectSignal(selectIsHost);

  protected responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '500px',
      numVisible: 1,
      numScroll: 1,
    },
  ];

  protected copyRoomCode(): void {
    navigator.clipboard
      .writeText(this.game().roomCode)
      .then(() => this.toastService.success('Copied to clipboard.'));
  }

  protected startGame(): void {
    this.store.dispatch(GameActions.startGame());
  }

  protected leave(): void {
    this.store.dispatch(GameActions.leave());
  }
}
