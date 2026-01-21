import { Component } from '@angular/core';
import { Authorization } from '@/app/core/auth/authorization';
import { LeaderboardEntry } from '@/app/features/leaderboards/types/leaderboard-entry';
import { input, inject } from '@angular/core';

@Component({
  selector: 'app-leaderboard-entry',
  templateUrl: './leaderboards-leaderboard-entry.html'
})
export  class LeaderboardsLeaderboardEntry {
  private readonly authorizationService = inject(Authorization);

  public leaderboard = input.required<LeaderboardEntry>();

  protected isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }
}