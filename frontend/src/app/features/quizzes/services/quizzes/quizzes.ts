import { MOCK_QUIZZES } from '@/app/dev/quiz-list';
import { QuizItem } from '@/app/features/quizzes/types/quiz-item';
import { Injectable, signal } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

interface LoadQuizzesParams {
  page: number;
  pageSize: number;
}

interface LoadQuizzesResponse {
  items: QuizItem[];
  total: number;
  hasMore: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Quizzes {
  private quizzes = signal<QuizItem[]>([]);
  public loadedQuizzes = this.quizzes.asReadonly();

  private isLoading = signal<boolean>(false);
  public loading = this.isLoading.asReadonly();

  public readonly totalCount = signal<number>(0);
  private currentPage = signal<number>(0);

  private getQuizzes(params: LoadQuizzesParams): Observable<LoadQuizzesResponse> {
    // Simulate API call with delay
    const { page, pageSize } = params;
    const start = (page - 1) * pageSize;
    const items = MOCK_QUIZZES.slice(start, start + pageSize);
    const total = MOCK_QUIZZES.length;

    return of({ items, total, hasMore: start + pageSize < total }).pipe(delay(2000));
  }

  public getInitialQuizzes(pageSize: number = 10): void {
    if (this.isLoading() || this.quizzes().length > 0) return;

    this.isLoading.set(true);
    this.currentPage.set(1);

    this.getQuizzes({ page: 1, pageSize }).subscribe({
      next: ({ items, total }) => {
        this.quizzes.set(items);
        this.totalCount.set(total);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  public getMoreQuizzes(pageSize: number = 10): void {
    if (this.isLoading()) return;

    const nextPage = this.currentPage() + 1;
    this.isLoading.set(true);

    this.getQuizzes({ page: nextPage, pageSize }).subscribe({
      next: ({ items }) => {
        this.quizzes.update((curr) => [...curr, ...items]);
        this.currentPage.set(nextPage);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }
}
