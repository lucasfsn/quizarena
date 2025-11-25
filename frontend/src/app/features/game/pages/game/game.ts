import { MOCK_GAME_LOBBY } from '@/app/dev/game-lobby';
import { GameLobby } from '@/app/features/game/components/game-lobby/game-lobby';
import { Component, signal } from '@angular/core';
import { LobbyMessage } from '@/app/features/game/types/lobby';

@Component({
  selector: 'app-game',
  imports: [GameLobby],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {
  protected readonly game = signal<LobbyMessage>(MOCK_GAME_LOBBY);
}
