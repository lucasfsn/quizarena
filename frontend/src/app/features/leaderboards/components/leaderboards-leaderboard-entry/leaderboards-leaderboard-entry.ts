import { Authorization } from '@/app/core/auth/authorization';
import { LeaderboardEntry } from '@/app/features/leaderboards/types/leaderboard-entry';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-leaderboard-entry',
  templateUrl: './leaderboards-leaderboard-entry.html',
})
export class LeaderboardsLeaderboardEntry {
  private readonly authorizationService = inject(Authorization);

  public user = input.required<LeaderboardEntry>();
  public position = input.required<number>();

  protected isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }
}
