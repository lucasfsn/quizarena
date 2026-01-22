import { Page } from '@/app/core/types/page';
import { Response } from '@/app/core/types/response';
import { LeaderboardEntry } from '@/app/features/leaderboard/types/leaderboard-entry';
import { environment } from '@/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Leaderboard {
  private readonly http = inject(HttpClient);

  public getLeaderboard(
    page: number = 0,
    pageSize: number = 10
  ): Observable<Page<LeaderboardEntry>> {
    const params = this.getLeaderboardParams(page, pageSize);

    return this.http
      .get<Response<Page<LeaderboardEntry>>>(
        `${environment.apiUrl}/users/leaderboard`,
        {
          params,
        }
      )
      .pipe(map((res: Response<Page<LeaderboardEntry>>) => res.data));
  }

  private getLeaderboardParams(page: number, pageSize: number): HttpParams {
    return new HttpParams().set('page', page).set('pageSize', pageSize);
  }
}
