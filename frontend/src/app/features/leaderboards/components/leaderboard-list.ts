import { LeaderboardSkeleton } from '@/app/features/leaderboards/leaderboard-skeleton/leaderboard-skeleton';  
import { LeaderboardEntry } from '@/app/features/leaderboards/types/leaderboard-entry';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-leaderboards-list',
  imports: [LeaderboardSkeleton],
  templateUrl: "./leaderboard.html",
  // styleUrl: './leaderboards-list.scss',
})
export class LeaderboardsList {
  public leaderboards = input.required<LeaderboardEntry[]>();
  public skeletonCount = input.required<number>();
  public isPending = input.required<boolean>();
  public isFetching = input.required<boolean>();
}
