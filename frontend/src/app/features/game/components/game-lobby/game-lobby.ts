import { LobbyPayload } from '@/app/features/game/types/lobby';
import { Button } from '@/app/shared/components/button/button';
import { GameLobbyImage } from '@/app/shared/components/svg/game-lobby-image';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-game-lobby',
  imports: [Button, GameLobbyImage],
  templateUrl: './game-lobby.html',
  styleUrl: './game-lobby.scss',
})
export class GameLobby {
  public game = input.required<LobbyPayload>();
}
