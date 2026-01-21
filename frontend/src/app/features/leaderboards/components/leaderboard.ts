import { Component } from '@angular/core';
import { LeaderboardsList } from '@/app/features/leaderboards/components/leaderboard-list';

@Component({
  selector: 'app-leaderboards',
  imports: [LeaderboardsList],
  templateUrl: './leaderboard.html',
  // styleUrl: './quizzes.scss',
})
export  class Leaderboards {}