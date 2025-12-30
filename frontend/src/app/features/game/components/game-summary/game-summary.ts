import { GameSummarySkeleton } from '@/app/features/game/components/game-summary-skeleton/game-summary-skeleton';
import { getGameResultQueryKey } from '@/app/features/game/queries/get-game-result-query-key';
import { Game } from '@/app/features/game/services/game/game';
import { GameDetails } from '@/app/features/game/types/game-details';
import { GameResultPlayer } from '@/app/features/game/types/game-result';
import { FallbackUi } from '@/app/shared/components/fallback-ui/fallback-ui';
import { FetchErrorImage } from '@/app/shared/components/svg/fetch-error-image';
import { Component, inject, input } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { TableModule } from 'primeng/table';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-game-summary',
  imports: [TableModule, GameSummarySkeleton, FallbackUi, FetchErrorImage],
  templateUrl: './game-summary.html',
  styleUrl: './game-summary.scss',
})
export class GameSummary {
  public readonly game = input.required<GameDetails>();
  public readonly summaryId = input.required<string | null>();

  private readonly gameService = inject(Game);

  protected query = injectQuery(() => ({
    queryKey: getGameResultQueryKey(this.summaryId()!),
    queryFn: async () =>
      lastValueFrom(this.gameService.getGameResult(this.summaryId()!)),
    staleTime: Infinity,
    enabled: !!this.summaryId(),
  }));

  protected get loggedInPlayer(): GameResultPlayer | undefined {
    return this.query
      .data()
      ?.players.find((player) => player.player.id === 'logged-in-player-id');
  } // TODO: Replace with actual logged-in player ID
}
