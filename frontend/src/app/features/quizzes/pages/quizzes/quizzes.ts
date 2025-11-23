import { QuizzesFilters } from '@/app/features/quizzes/components/quizzes-filters/quizzes-filters';
import { QuizzesList } from '@/app/features/quizzes/components/quizzes-list/quizzes-list';
import { getQuizzesQueryKey } from '@/app/features/quizzes/queries/get-quizzes-query-key';
import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { Quizzes as QuizzesService } from '@/app/features/quizzes/services/quizzes/quizzes';
import { Button } from '@/app/shared/components/button/button';
import { FallbackUi } from '@/app/shared/components/fallback-ui/fallback-ui';
import { FetchErrorImage } from '@/app/shared/components/svg/fetch-error-image';
import { Component, computed, inject } from '@angular/core';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-quizzes',
  imports: [Button, FallbackUi, FetchErrorImage, QuizzesFilters, QuizzesList],
  templateUrl: './quizzes.html',
  styleUrl: './quizzes.scss',
})
export class Quizzes {
  protected quizFiltersService = inject(QuizFilters);
  protected quizzesService = inject(QuizzesService);

  private readonly PAGE_SIZE = 10;

  protected query = injectInfiniteQuery(() => ({
    queryKey: [...getQuizzesQueryKey(), this.quizFiltersService.filters()],
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

  protected skeletonCount = computed(() => {
    const pages = this.query.data()?.pages ?? [];
    const loaded = pages.reduce((prev, curr) => prev + curr.numberOfElements, 0);
    const total = pages[0]?.totalElements ?? 0;

    if (loaded === 0) return this.PAGE_SIZE;

    const remaining = Math.min(this.PAGE_SIZE, Math.max(total - loaded, 0));

    return remaining;
  });

  protected quizzes = computed(() => {
    const pages = this.query.data()?.pages ?? [];

    return pages.flatMap((page) => page.content);
  });
}
