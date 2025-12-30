import { Page } from '@/app/core/types/page';
import { PAGE_SIZE } from '@/app/features/quizzes/constants/quizzes-page-size';
import { getQuizzesQueryKey } from '@/app/features/quizzes/queries/get-quizzes-query-key';
import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { Quizzes } from '@/app/features/quizzes/services/quizzes/quizzes';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';
import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';

export const quizzesResolver: ResolveFn<void> = () => {
  const queryClient = inject(QueryClient);
  const quizFiltersService = inject(QuizFilters);
  const quizzesService = inject(Quizzes);

  return queryClient.prefetchInfiniteQuery({
    queryKey: [...getQuizzesQueryKey(), quizFiltersService.filters()],
    queryFn: async ({ pageParam }) =>
      lastValueFrom(
        quizzesService.getQuizzes(
          pageParam,
          PAGE_SIZE,
          quizFiltersService.filters()
        )
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage: Page<QuizPreview>) =>
      lastPage.last ? undefined : lastPage.number + 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
