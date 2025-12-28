import { Page } from '@/app/core/types/page';
import { MOCK_QUIZZES } from '@/app/dev/quiz-list';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';
import { QuizzesFilters } from '@/app/features/quizzes/types/quizzes-filters';
import { delay, Observable, of } from 'rxjs';

export function getMockQuizzes(
  page: number,
  pageSize: number,
  filters?: QuizzesFilters,
): Observable<Page<QuizPreview>> {
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

  const mockPage: Page<QuizPreview> = {
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
