import { Toast } from '@/app/core/services/toast/toast';
import { LobbyPayload } from '@/app/features/game/types/lobby';
import { Button } from '@/app/shared/components/button/button';
import { GameLobbyImage } from '@/app/shared/components/svg/game-lobby-image';
import { Component, inject, input } from '@angular/core';
import { Carousel } from 'primeng/carousel';

@Component({
  selector: 'app-game-lobby',
  imports: [Button, GameLobbyImage, Carousel],
  templateUrl: './game-lobby.html',
  styleUrl: './game-lobby.scss',
})
export class GameLobby {
  public game = input.required<LobbyPayload>();

  private toastService = inject(Toast);

  protected copyRoomCode(gameCode: string): void {
    navigator.clipboard
      .writeText(gameCode)
      .then(() => this.toastService.success('Copied to clipboard.'));
  }
}
