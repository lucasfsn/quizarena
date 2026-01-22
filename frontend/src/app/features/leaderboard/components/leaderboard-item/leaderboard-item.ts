import { Authorization } from '@/app/core/auth/authorization';
import { LeaderboardEntry } from '@/app/features/leaderboard/types/leaderboard-entry';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-leaderboard-item',
  imports: [],
  templateUrl: './leaderboard-item.html',
  styleUrl: './leaderboard-item.scss',
})
export class LeaderboardItem {
  private readonly authorizationService = inject(Authorization);

  public user = input.required<LeaderboardEntry>();
  public position = input.required<number>();

  protected isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }
}
