import { LeaderboardEntry } from '@/app/features/leaderboards/types/leaderboard-entry';
import { Component, computed, inject, input } from '@angular/core';

import { LeaderboardSkeleton } from '@/app/features/leaderboards/components/leaderboard-skeleton/leaderboard-skeleton';
import { LeaderboardsLeaderboardEntry } from '@/app/features/leaderboards/components/leaderboards-leaderboard-entry/leaderboards-leaderboard-entry';
import { User } from '@/app/features/user/services/user/user';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-leaderboards-list',
  imports: [LeaderboardSkeleton, LeaderboardsLeaderboardEntry],
  templateUrl: './leaderboard-list.html',
})
export class LeaderboardsList {
  private readonly userService = inject(User);

  public leaderboards = input.required<LeaderboardEntry[]>();
  public skeletonCount = input.required<number>();
  public isPending = input.required<boolean>();
  public isFetching = input.required<boolean>();

  private readonly userQuery = injectQuery(() => ({
    ...this.userService.fetchLoggedInUserOptions(),
    select: (user) => user.id,
  }));

  protected readonly loggedInUserScore = computed(() => {
    const userId = this.userQuery.data();
    const list = this.leaderboards();

    if (!userId) return null;

    const index = list.findIndex((user) => user.id === userId);

    if (index === -1) return null;

    const user = list[index];

    return {
      username: user.username,
      score: user.score,
      position: index + 1,
    };
  });
}
