
import { Skeleton } from 'primeng/skeleton';
import { Button } from '@/app/shared/components/button/button';
import { Component, inject, computed } from '@angular/core';
import { LeaderboardsService } from '@/app/features/leaderboards/services/leaderboard';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { getQuizzesQueryKey } from '@/app/features/quizzes/queries/get-quizzes-query-key';
import { lastValueFrom } from 'rxjs';
import { Authorization } from '@/app/core/auth/authorization';
import { Leaderboards } from '@/app/features/leaderboards/components/leaderboard';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-leaderboard-skeleton',
  imports: [Skeleton, Button, Leaderboards],
  templateUrl: './leaderboard-skeleton.html',
//   styleUrl: './leaderboard-skeleton.scss',
})

export class LeaderboardSkeleton {
  // private http = inject(HttpClient);
  // private apiUrl = `${environment.apiUrl}/leaderboards`; 

  // public getLeaderboard(page: number = 0, size: number = 10): Observable<LeaderboardResponse> {
  //   const params = new HttpParams()
  //     .set('page', page.toString())
  //     .set('size', size.toString());

  //   return this.http.get<LeaderboardResponse>(this.apiUrl, { params });
  // }

/////////////////////////////////////////////
private readonly leaderboardsService = inject(LeaderboardsService);
private readonly authorizationService = inject(Authorization);

protected query = injectInfiniteQuery(() => ({
    queryKey: getQuizzesQueryKey(),
    queryFn: async ({ pageParam }) =>
      lastValueFrom(
        this.leaderboardsService.getLeaderboards(
          pageParam,
          PAGE_SIZE
        )
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

  protected quizzes = computed(() => {
    const pages = this.query.data()?.pages ?? [];

    return pages.flatMap((page) => page.content);
  });

  protected isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

}