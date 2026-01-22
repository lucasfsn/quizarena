import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-leaderboard-skeleton',
  imports: [Skeleton],
  templateUrl: './leaderboard-skeleton.html',
  styleUrl: './leaderboard-skeleton.scss',
})
export class LeaderboardSkeleton {}
