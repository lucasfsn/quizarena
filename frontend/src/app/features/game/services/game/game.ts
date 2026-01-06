import { Response } from '@/app/core/types/response';
import { getMockSummary } from '@/app/dev/get-mock-summary';
import { GameDetails } from '@/app/features/game/types/game-details';
import { GameResult } from '@/app/features/game/types/game-result';
import { GameSession } from '@/app/features/game/types/game-session';
import { environment } from '@/environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Game {
  private readonly http = inject(HttpClient);

  private useMock = true;

  public createGame(quizId: string): Observable<GameDetails> {
    return this.http
      .post<Response<GameDetails>>(`${environment.apiUrl}/games`, {
        quizId,
      })
      .pipe(map((res: Response<GameDetails>) => res.data));
  }

  public joinGame(roomCode: string): Observable<GameSession> {
    return this.http
      .post<Response<GameSession>>(`${environment.apiUrl}/games/join`, {
        roomCode,
      })
      .pipe(map((res: Response<GameSession>) => res.data));
  }

  public getGameResult(summaryId: string): Observable<GameResult> {
    if (this.useMock) return getMockSummary();

    return this.http
      .get<Response<GameResult>>(`${environment.apiUrl}/results/${summaryId}`)
      .pipe(map((res: Response<GameResult>) => res.data));
  }
}
