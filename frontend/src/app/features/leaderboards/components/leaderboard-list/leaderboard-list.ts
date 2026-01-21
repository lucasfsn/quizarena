import { LeaderboardEntry } from '@/app/features/leaderboards/types/leaderboard-entry';
import { Component, input } from '@angular/core';

import { LeaderboardSkeleton } from '@/app/features/leaderboards/components/leaderboard-skeleton/leaderboard-skeleton';
import { LeaderboardsLeaderboardEntry } from '@/app/features/leaderboards/components/leaderboards-leaderboard-entry/leaderboards-leaderboard-entry';

@Component({
  selector: 'app-leaderboards-list',
  imports: [LeaderboardSkeleton, LeaderboardsLeaderboardEntry],
  templateUrl: './leaderboard-list.html',
  // styleUrl: './leaderboards-list.scss',
})
export class LeaderboardsList {
  public leaderboards = input.required<LeaderboardEntry[]>();
  public skeletonCount = input.required<number>();
  public isPending = input.required<boolean>();
  public isFetching = input.required<boolean>();
}
