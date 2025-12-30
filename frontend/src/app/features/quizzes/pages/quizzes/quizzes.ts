import { Authorization } from '@/app/core/auth/authorization';
import { QuizzesFilters } from '@/app/features/quizzes/components/quizzes-filters/quizzes-filters';
import { QuizzesList } from '@/app/features/quizzes/components/quizzes-list/quizzes-list';
import { PAGE_SIZE } from '@/app/features/quizzes/constants/quizzes-page-size';
import { getQuizzesQueryKey } from '@/app/features/quizzes/queries/get-quizzes-query-key';
import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { Quizzes as QuizzesService } from '@/app/features/quizzes/services/quizzes/quizzes';
import { Button } from '@/app/shared/components/button/button';
import { FallbackUi } from '@/app/shared/components/fallback-ui/fallback-ui';
import { FetchErrorImage } from '@/app/shared/components/svg/fetch-error-image';
import { Component, computed, inject, OnInit } from '@angular/core';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-quizzes',
  imports: [Button, FallbackUi, FetchErrorImage, QuizzesFilters, QuizzesList],
  templateUrl: './quizzes.html',
  styleUrl: './quizzes.scss',
})
export class Quizzes implements OnInit {
  private quizFiltersService = inject(QuizFilters);
  private quizzesService = inject(QuizzesService);
  private authorizationService = inject(Authorization);

  protected query = injectInfiniteQuery(() => ({
    queryKey: [...getQuizzesQueryKey(), this.quizFiltersService.filters()],
    queryFn: async ({ pageParam }) =>
      lastValueFrom(
        this.quizzesService.getQuizzes(
          pageParam,
          PAGE_SIZE,
          this.quizFiltersService.filters()
        )
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  }));

  protected skeletonCount = computed(() => {
    const pages = this.query.data()?.pages ?? [];
    const loaded = pages.reduce(
      (prev, curr) => prev + curr.numberOfElements,
      0
    );
    const total = pages[0]?.totalElements ?? 0;

    if (loaded === 0) return PAGE_SIZE;

    const remaining = Math.min(PAGE_SIZE, Math.max(total - loaded, 0));

    return remaining;
  });

  protected quizzes = computed(() => {
    const pages = this.query.data()?.pages ?? [];

    return pages.flatMap((page) => page.content);
  });

  protected isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  public ngOnInit(): void {
    this.quizFiltersService.reset();
  }
}
