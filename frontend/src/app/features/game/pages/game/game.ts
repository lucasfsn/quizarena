import { MOCK_GAME_LOBBY } from '@/app/dev/game-lobby';
import { GameLobby } from '@/app/features/game/components/game-lobby/game-lobby';
import { Lobby } from '@/app/features/game/types/lobby';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [GameLobby],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {
  protected readonly game = signal<Lobby>(MOCK_GAME_LOBBY);
}
