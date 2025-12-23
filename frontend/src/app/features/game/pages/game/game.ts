import { MOCK_GAME_LOBBY } from '@/app/dev/game-lobby';
import { GameLobby } from '@/app/features/game/components/game-lobby/game-lobby';
import { GamePlay } from '@/app/features/game/components/game-play/game-play';
import { GameSummary } from '@/app/features/game/components/game-summary/game-summary';
import { GameDetails } from '@/app/features/game/types/game-details';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [GamePlay, GameLobby, GameSummary],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {
  protected readonly game = signal<GameDetails>(MOCK_GAME_LOBBY);
}
