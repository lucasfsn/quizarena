import { Authorization } from '@/app/core/auth/authorization';
import { LeaderboardsList } from '@/app/features/leaderboards/components/leaderboard-list/leaderboard-list';
import { PAGE_SIZE } from '@/app/features/leaderboards/Constants/leaderboard-page-size';
import { getLeaderboardQueryKey } from '@/app/features/leaderboards/queries/get-leaderboard-query-key';
import { LeaderboardsService } from '@/app/features/leaderboards/services/leaderboard';
import { Button } from '@/app/shared/components/button/button';
import { FallbackUi } from '@/app/shared/components/fallback-ui/fallback-ui';
import { FetchErrorImage } from '@/app/shared/components/svg/fetch-error-image';
import { Component, computed, inject } from '@angular/core';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-leaderboards',
  imports: [Button, FallbackUi, LeaderboardsList, FetchErrorImage],
  templateUrl: './leaderboards.html',
})
export class Leaderboards {
  private readonly leaderboardsService = inject(LeaderboardsService);
  private readonly authorizationService = inject(Authorization);

  protected query = injectInfiniteQuery(() => ({
    queryKey: getLeaderboardQueryKey(),
    queryFn: async ({ pageParam }) =>
      lastValueFrom(
        this.leaderboardsService.getLeaderboards(pageParam, PAGE_SIZE)
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
    retry: 3,
    staleTime: 10 * 60 * 1000, // 10 minutes
  }));

  protected skeletonCount = computed(() => {
    const pages = this.query.data()?.pages ?? [];
    const loaded = pages.reduce(
      (prev, curr) => prev + curr.numberOfElements,
      0
    );
    const total = pages[0]?.totalElements ?? 0;

    if (loaded === 0) return PAGE_SIZE;

    const remaining = Math.min(PAGE_SIZE, Math.max(total - loaded, 0));

    return remaining;
  });

  protected leaderboards = computed(() => {
    const pages = this.query.data()?.pages ?? [];

    return pages
      .flatMap((page) => page.content)
      .map((user) => ({ ...user, score: user.score ?? 0 }))
      .sort((a, b) => b.score - a.score);
  });

  protected isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }
}
