import { Component, OnInit } from '@angular/core';
import { UserService, LeaderboardUser } from '../../core/services/user.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: LeaderboardUser[] = [];
  loading = true;
  error = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getLeaderboard().subscribe({
      next: (data) => {
        this.leaderboard = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}
