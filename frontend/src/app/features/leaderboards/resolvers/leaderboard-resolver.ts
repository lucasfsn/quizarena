import { Page } from '@/app/core/types/page';
import { PAGE_SIZE } from '@/app/features/quizzes/constants/quizzes-page-size';
import { getQuizzesQueryKey } from '@/app/features/quizzes/queries/get-quizzes-query-key';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { LeaderboardsService } from '@/app/features/leaderboards/services/leaderboard';
import { LeaderboardResponse } from '@/app/features/leaderboards/types/leaderboard-response';

export const leaderboardResolver: ResolveFn<void> = () => {
  const queryClient = inject(QueryClient);
  const leaderboardService = inject(LeaderboardsService);

  return queryClient.prefetchInfiniteQuery({
    queryKey: getQuizzesQueryKey(),
    queryFn: async ({ pageParam }) =>
      lastValueFrom(
        leaderboardService.getLeaderboards(
          pageParam,
          PAGE_SIZE
        )
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Page<LeaderboardResponse>) =>
      lastPage.last ? undefined : lastPage.number + 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
