import { Page } from '@/app/core/types/page';
import { PAGE_SIZE } from '@/app/features/leaderboards/Constants/leaderboard-page-size';
import { getLeaderboardQueryKey } from '@/app/features/leaderboards/queries/get-leaderboard-query-key';
import { LeaderboardsService } from '@/app/features/leaderboards/services/leaderboard';
import { LeaderboardEntry } from '@/app/features/leaderboards/types/leaderboard-entry';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export const leaderboardResolver: ResolveFn<void> = () => {
  const queryClient = inject(QueryClient);
  const leaderboardService = inject(LeaderboardsService);

  return queryClient.prefetchInfiniteQuery({
    queryKey: getLeaderboardQueryKey(),
    queryFn: async ({ pageParam }) =>
      lastValueFrom(leaderboardService.getLeaderboards(pageParam, PAGE_SIZE)),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Page<LeaderboardEntry>) =>
      lastPage.last ? undefined : lastPage.number + 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
