import { MOCK_GAME_RESULT } from '@/app/dev/game-summary';
import { GameDetails } from '@/app/features/game/types/game-details';
import { GameResult, GameResultPlayer } from '@/app/features/game/types/game-result';
import { Component, input, signal } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-game-summary',
  imports: [TableModule],
  templateUrl: './game-summary.html',
  styleUrl: './game-summary.scss',
})
export class GameSummary {
  public game = input.required<GameDetails>();

  protected readonly summary = signal<GameResult>(MOCK_GAME_RESULT);

  protected get loggedInPlayer(): GameResultPlayer | undefined {
    return this.summary().players.find(
      (player) => player.player.id === MOCK_GAME_RESULT.players.at(5)?.player.id,
    );
  } // TODO: Replace with actual logged-in player ID
}
