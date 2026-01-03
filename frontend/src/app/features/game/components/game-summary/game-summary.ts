import { GameSummarySkeleton } from '@/app/features/game/components/game-summary-skeleton/game-summary-skeleton';
import { getGameResultQueryKey } from '@/app/features/game/queries/get-game-result-query-key';
import { Game } from '@/app/features/game/services/game/game';
import { GameDetails } from '@/app/features/game/types/game-details';
import { User } from '@/app/features/user/services/user/user';
import { FallbackUi } from '@/app/shared/components/fallback-ui/fallback-ui';
import { FetchErrorImage } from '@/app/shared/components/svg/fetch-error-image';
import { Component, computed, inject, input } from '@angular/core';
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
  private readonly gameService = inject(Game);
  private readonly userService = inject(User);

  public readonly game = input.required<GameDetails>();
  public readonly summaryId = input.required<string | null>();

  protected gameQuery = injectQuery(() => ({
    queryKey: getGameResultQueryKey(this.summaryId()!),
    queryFn: async () =>
      lastValueFrom(this.gameService.getGameResult(this.summaryId()!)),
    staleTime: Infinity,
    enabled: !!this.summaryId(),
  }));

  public userQuery = injectQuery(() => ({
    ...this.userService.fetchLoggedInUserOptions(),
    select: (user) => user.id,
  }));

  protected loggedInPlayer = computed(() => {
    const userId = this.userQuery.data();
    const gameData = this.gameQuery.data();

    if (!userId || !gameData) return;

    return gameData.players.find((player) => player.player.id === userId);
  });
}
