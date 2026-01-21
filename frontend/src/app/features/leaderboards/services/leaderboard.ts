import { Page } from '@/app/core/types/page';
import { Response } from '@/app/core/types/response';
import { LeaderboardResponse } from '@/app/features/leaderboards/types/leaderboard-response';
import { environment } from '@/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardsService {
  private readonly http = inject(HttpClient);

  public getLeaderboards(
    page: number = 0,
    pageSize: number = 10,
  ): Observable<Page<LeaderboardResponse>> {
    const params = this.getQuizzesParams(page, pageSize);

    return this.http
      .get<Response<Page<LeaderboardResponse>>>(`${environment.apiUrl}/leaderboards`, {
        params,
      })
      .pipe(map((res: Response<Page<LeaderboardResponse>>) => res.data));
  }

  private getQuizzesParams(
    page: number,
    pageSize: number
  ): HttpParams {
    return new HttpParams().set('page', page).set('pageSize', pageSize);
  }
}
