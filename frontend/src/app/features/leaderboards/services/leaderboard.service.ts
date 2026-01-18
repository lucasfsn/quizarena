// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { Observable } from 'rxjs';
// import { environment } from '@/environments/environment';


// export interface LeaderboardEntry {
//   id: string;
//   username: string;
//   score: number;
// }

// export interface LeaderboardResponse {
//   content: LeaderboardEntry[];
//   totalPages: number;
//   totalElements: number;
// }

// @Injectable({
//   providedIn: 'root',
// })

// export class LeaderboardService {
//   private http = inject(HttpClient);
//   private apiUrl = `${environment.apiUrl}/leaderboard`; //TODO CHANGE THE PATH IF DIFFERENT

//   public getLeaderboard(page: number = 0, size: number = 10): Observable<LeaderboardResponse> {
//     return this.http.get<LeaderboardResponse>(this.apiUrl, {
//       params: {
//         page: page.toString(),
//         size: size.toString(),
//       },
//     });
//   }
// }

import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs'; // 'of' creates a stream, 'delay' fakes network lag
import { tap } from 'rxjs/operators';

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  rank: number;
  wins?: number;    
  winRate?: number;
}

export interface LeaderboardResponse {
  content: LeaderboardEntry[];
  totalPages: number;
  totalElements: number;
}

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {

  // FAKE DATA GENERATOR
  private mockData: LeaderboardEntry[] = Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString(),
    username: i === 24 ? 'You (Alex Smith)' : `Player_${i + 1}`, // Make the 25th user "You"
    score: 50000 - (i * 500), // Scores go down as rank goes up
    rank: i + 1
  }));

  public getLeaderboard(page: number = 0, size: number = 10): Observable<LeaderboardResponse> {
    const start = page * size;
    const end = start + size;
    const pageData = this.mockData.slice(start, end);

    const response: LeaderboardResponse = {
      content: pageData,
      totalPages: Math.ceil(this.mockData.length / size),
      totalElements: this.mockData.length,
    };

    return of(response).pipe(
    delay(500),
    tap((data) => console.log('Data successfully loaded:', data)) // <--- Add this spy
    );

    // Return the fake data with a 1-second delay to simulate a real server
    // return of(response).pipe(delay(500)); 
  }
}