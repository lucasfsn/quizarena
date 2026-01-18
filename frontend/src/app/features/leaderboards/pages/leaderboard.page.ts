import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@/environments/environment';

export interface LeaderboardEntry {
  id: string;
  username: string; 
  score: number;    
  rank?: number;    
  wins?: number;
  winRate?: number;
}

export interface LeaderboardResponse {
  content: LeaderboardEntry[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/leaderboards`; 

  public getLeaderboard(page: number = 0, size: number = 10): Observable<LeaderboardResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<LeaderboardResponse>(this.apiUrl, { params });
  }
}