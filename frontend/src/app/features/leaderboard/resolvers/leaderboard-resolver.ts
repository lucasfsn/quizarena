import { Page } from '@/app/core/types/page';
import { PAGE_SIZE } from '@/app/features/leaderboard/constants/leaderboard-page-size';
import { getLeaderboardQueryKey } from '@/app/features/leaderboard/queries/get-leaderboard-query-key';
import { Leaderboard } from '@/app/features/leaderboard/services/leaderboard';
import { LeaderboardEntry } from '@/app/features/leaderboard/types/leaderboard-entry';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export const leaderboardResolver: ResolveFn<void> = () => {
  const queryClient = inject(QueryClient);
  const leaderboardService = inject(Leaderboard);

  return queryClient.prefetchInfiniteQuery({
    queryKey: getLeaderboardQueryKey(),
    queryFn: async ({ pageParam }) =>
      lastValueFrom(leaderboardService.getLeaderboard(pageParam, PAGE_SIZE)),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Page<LeaderboardEntry>) =>
      lastPage.last ? undefined : lastPage.number + 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
