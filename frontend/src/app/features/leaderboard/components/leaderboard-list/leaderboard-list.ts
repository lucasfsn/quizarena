import { LeaderboardEntry } from '@/app/features/leaderboard/types/leaderboard-entry';
import { Component, computed, inject, input } from '@angular/core';

import { LeaderboardItem } from '@/app/features/leaderboard/components/leaderboard-item/leaderboard-item';
import { LeaderboardSkeleton } from '@/app/features/leaderboard/components/leaderboard-skeleton/leaderboard-skeleton';
import { User } from '@/app/features/user/services/user/user';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Component({
  selector: 'app-leaderboard-list',
  imports: [LeaderboardSkeleton, LeaderboardItem],
  templateUrl: './leaderboard-list.html',
  styleUrl: './leaderboard-list.scss',
})
export class LeaderboardList {
  private readonly userService = inject(User);

  public leaderboard = input.required<LeaderboardEntry[]>();
  public skeletonCount = input.required<number>();
  public isPending = input.required<boolean>();
  public isFetching = input.required<boolean>();

  private readonly userQuery = injectQuery(() => ({
    ...this.userService.fetchLoggedInUserOptions(),
    select: (user) => user.id,
  }));

  protected readonly loggedInUserScore = computed(() => {
    const userId = this.userQuery.data();
    const list = this.leaderboard();

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
