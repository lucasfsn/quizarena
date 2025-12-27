import { getGameResultQueryKey } from '@/app/features/game/queries/get-game-result-query-key';
import { Game } from '@/app/features/game/services/game/game';
import { selectSummaryId } from '@/app/store/selectors/game.selectors';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export const gameResolverResolver: ResolveFn<void> = () => {
  const queryClient = inject(QueryClient);
  const gameService = inject(Game);
  const store = inject(Store);

  const summaryId = store.selectSignal(selectSummaryId)();

  if (!summaryId) return;

  return queryClient.prefetchQuery({
    queryKey: getGameResultQueryKey(summaryId),
    queryFn: async () => lastValueFrom(gameService.getGameResult(summaryId)),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
