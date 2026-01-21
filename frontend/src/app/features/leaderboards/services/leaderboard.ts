import { Page } from '@/app/core/types/page';
import { Response } from '@/app/core/types/response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map,Observable } from 'rxjs';
import { environment } from '@/environments/environment';
import { LeaderboardEntry } from '@/app/features/leaderboards/types/leaderboard-entry';
//import { MOCK_LEADERBOARD_PAGE } from '@/app/features/leaderboards/services/leaderboard.mock';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardsService {
  private readonly http = inject(HttpClient);

  public getLeaderboards(
    page: number = 0,
    pageSize: number = 10,
  ): Observable<Page<LeaderboardEntry>> {
    // MOCK DATA
    //return of(MOCK_LEADERBOARD_PAGE);

    const params = this.getQuizzesParams(page, pageSize);

    return this.http
      .get<Response<Page<LeaderboardEntry>>>(`${environment.apiUrl}/leaderboards`, {
        params,
      })
      .pipe(map((res: Response<Page<LeaderboardEntry>>) => res.data));
  }

  private getQuizzesParams(
    page: number,
    pageSize: number
  ): HttpParams {
    return new HttpParams().set('page', page).set('pageSize', pageSize);
  }
}
