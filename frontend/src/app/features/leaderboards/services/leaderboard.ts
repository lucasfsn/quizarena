import { Page } from '@/app/core/types/page';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; //TODO of => map
// import { Response } from '@/app/core/types/response';
// import { environment } from '@/environments/environment';
import { MOCK_LEADERBOARD_PAGE } from '@/app/features/leaderboards/services/leaderboard.mock';
import { LeaderboardEntry } from '@/app/features/leaderboards/types/leaderboard-entry';

@Injectable({
  providedIn: 'root',
})
export class LeaderboardsService {
  private readonly http = inject(HttpClient);

  public getLeaderboards(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    page: number = 0,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pageSize: number = 10
  ): Observable<Page<LeaderboardEntry>> {
    // MOCK DATA
    return of(MOCK_LEADERBOARD_PAGE);

    // const params = this.getQuizzesParams(page, pageSize);

    // return this.http
    //   .get<Response<Page<LeaderboardEntry>>>(`${environment.apiUrl}/leaderboards`, {
    //     params,
    //   })
    //   .pipe(map((res: Response<Page<LeaderboardEntry>>) => res.data));
  }

  private getQuizzesParams(page: number, pageSize: number): HttpParams {
    return new HttpParams().set('page', page).set('pageSize', pageSize);
  }
}
