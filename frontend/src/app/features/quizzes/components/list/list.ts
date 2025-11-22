import { QuizSkeleton } from '@/app/features/quizzes/components/quiz-skeleton/quiz-skeleton';
import { Quiz } from '@/app/features/quizzes/components/quiz/quiz';
import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { Quizzes } from '@/app/features/quizzes/services/quizzes/quizzes';
import { QuizItem } from '@/app/features/quizzes/types/quiz-item';
import { Button } from '@/app/shared/components/button/button';
import { Component, computed, inject } from '@angular/core';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [Quiz, Button, QuizSkeleton],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  protected quizFiltersService = inject(QuizFilters);
  protected quizzesService = inject(Quizzes);

  private readonly PAGE_SIZE = 10;

  protected query = injectInfiniteQuery(() => ({
    queryKey: ['quizzes', this.quizFiltersService.filters()],
    queryFn: async ({ pageParam }) =>
      lastValueFrom(
        this.quizzesService.getQuizzes(
          pageParam,
          this.PAGE_SIZE,
          this.quizFiltersService.filters(),
        ),
      ),
    getNextPageParam: (lastPage) => (lastPage.last ? undefined : lastPage.number + 1),
    initialPageParam: 0,
  }));

  protected quizzesSkeleton = computed(() => {
    const pages = this.query.data()?.pages ?? [];
    const loaded = pages.reduce((prev, curr) => prev + curr.numberOfElements, 0);
    const total = pages[0]?.totalElements ?? 0;

    if (loaded === 0) return Array(this.PAGE_SIZE).fill(null);

    const remaining = Math.min(this.PAGE_SIZE, Math.max(total - loaded, 0));

    return Array(remaining).fill(null);
  });

  protected quizzes = computed<QuizItem[]>(() => {
    const pages = this.query.data()?.pages ?? [];

    return pages.flatMap((page) => page.content);
  });

  protected showButton = computed(
    () => !this.query.isFetchingNextPage() && this.query.hasNextPage(),
  );
}
