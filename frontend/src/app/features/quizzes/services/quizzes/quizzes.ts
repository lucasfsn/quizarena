import { Page } from '@/app/core/types/page';
import { Response } from '@/app/core/types/response';
import { MOCK_QUIZZES } from '@/app/dev/quiz-list';
import { QuizItem } from '@/app/features/quizzes/types/quiz-item';
import { QuizzesFilters } from '@/app/features/quizzes/types/quizzes-filters';
import { environment } from '@/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Quizzes {
  private http = inject(HttpClient);
  private useMock = true;

  public getQuizzes(
    page: number = 0,
    pageSize: number = 10,
    filters?: QuizzesFilters,
  ): Observable<Page<QuizItem>> {
    if (this.useMock) return this.getMockQuizzes(page, pageSize, filters);

    let params = new HttpParams().set('page', page).set('pageSize', pageSize);
    params = this.addFiltersToParams(params, filters);

    return this.http
      .get<Response<Page<QuizItem>>>(`${environment.apiUrl}/quizzes`, {
        params,
      })
      .pipe(map((res: Response<Page<QuizItem>>) => res.data));
  }

  private addFiltersToParams(params: HttpParams, filters?: QuizzesFilters): HttpParams {
    if (filters?.category) params = params.set('category', filters.category);

    if (filters?.title) params = params.set('title', filters.title);

    if (filters?.author) params = params.set('author', filters.author);

    return params;
  }

  // TEMP MOCK IMPLEMENTATION
  private getMockQuizzes(
    page: number,
    pageSize: number,
    filters?: QuizzesFilters,
  ): Observable<Page<QuizItem>> {
    let filteredQuizzes = MOCK_QUIZZES;

    if (filters?.category)
      filteredQuizzes = filteredQuizzes.filter((quiz) => quiz.category === filters.category);

    if (filters?.title)
      filteredQuizzes = filteredQuizzes.filter((quiz) =>
        quiz.title.toLowerCase().includes(filters.title!.toLowerCase()),
      );

    if (filters?.author)
      filteredQuizzes = filteredQuizzes.filter((quiz) =>
        quiz.author?.toLowerCase().includes(filters.author!.toLowerCase()),
      );

    const start = page * pageSize;
    const end = start + pageSize;
    const content = filteredQuizzes.slice(start, end);
    const totalElements = filteredQuizzes.length;
    const totalPages = Math.ceil(totalElements / pageSize);

    const mockPage: Page<QuizItem> = {
      content,
      pageable: {
        pageNumber: page,
        pageSize,
        sort: { unsorted: true, sorted: false, empty: true },
        offset: start,
        unpaged: false,
        paged: true,
      },
      totalPages,
      totalElements,
      last: page >= totalPages - 1,
      numberOfElements: content.length,
      first: page === 0,
      size: pageSize,
      number: page,
      sort: { unsorted: true, sorted: false, empty: true },
      empty: content.length === 0,
    };

    return of(mockPage).pipe(delay(1000));
  }
}
