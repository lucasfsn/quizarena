import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LeaderboardUser {
  id: number;
  name: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://your-backend-url.com/api/leaderboard';

  constructor(private http: HttpClient) {}

  getLeaderboard(): Observable<LeaderboardUser[]> {
    return this.http.get<LeaderboardUser[]>(this.apiUrl);
  }
}
