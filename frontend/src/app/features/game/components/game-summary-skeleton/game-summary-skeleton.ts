import { Component } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-game-summary-skeleton',
  imports: [Skeleton],
  templateUrl: './game-summary-skeleton.html',
  styleUrl: './game-summary-skeleton.scss',
})
export class GameSummarySkeleton {
  protected readonly SKELETON_COUNT = 5;
}
