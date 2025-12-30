import { Page } from '@/app/core/types/page';
import { Response } from '@/app/core/types/response';
import { getMockQuizzes } from '@/app/dev/get-mock-quizzes';
import { QuizCreatePayload } from '@/app/features/quizzes/types/quiz-create-payload';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';
import { QuizzesFilters } from '@/app/features/quizzes/types/quizzes-filters';
import { environment } from '@/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Quizzes {
  private http = inject(HttpClient);

  private useMock = true;

  public getQuizzes(
    page: number = 0,
    pageSize: number = 10,
    filters?: QuizzesFilters
  ): Observable<Page<QuizPreview>> {
    if (this.useMock) return getMockQuizzes(page, pageSize, filters);

    const params = this.getQuizzesParams(page, pageSize, filters);

    return this.http
      .get<Response<Page<QuizPreview>>>(`${environment.apiUrl}/quizzes`, {
        params,
      })
      .pipe(map((res: Response<Page<QuizPreview>>) => res.data));
  }

  public createQuiz(payload: QuizCreatePayload): Observable<QuizPreview> {
    return this.http
      .post<Response<QuizPreview>>(`${environment.apiUrl}/quizzes`, payload)
      .pipe(map((res: Response<QuizPreview>) => res.data));
  }

  private getQuizzesParams(
    page: number,
    pageSize: number,
    filters?: QuizzesFilters
  ): HttpParams {
    let params = new HttpParams().set('page', page).set('pageSize', pageSize);

    if (filters?.category) params = params.set('category', filters.category);
    if (filters?.title) params = params.set('title', filters.title);
    if (filters?.author) params = params.set('author', filters.author);

    return params;
  }
}
