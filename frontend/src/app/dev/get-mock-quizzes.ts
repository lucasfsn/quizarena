import { Page } from '@/app/core/types/page';
import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';
import { QuizzesFilters } from '@/app/features/quizzes/types/quizzes-filters';
import { delay, Observable, of } from 'rxjs';

export function getMockQuizzes(
  page: number,
  pageSize: number,
  filters?: QuizzesFilters
): Observable<Page<QuizPreview>> {
  let filteredQuizzes = [
    {
      id: '1',
      title: 'The World of AI Ethics',
      category: QuizCategory.TECHNOLOGY,
      author: 'John Doe',
      questionsCount: 10,
    },
    {
      id: '2',
      title: 'Ancient Civilizations',
      category: QuizCategory.HISTORY,
      author: 'Jane Smith',
      questionsCount: 15,
    },
    {
      id: '3',
      title: 'Quantum Physics Basics',
      category: QuizCategory.SCIENCE_AND_NATURE,
      author: 'Albert Newton',
      questionsCount: 20,
    },
    {
      id: '4',
      title: 'Modern Art Movements',
      category: QuizCategory.ART_AND_LITERATURE,
      author: 'Emily Clark',
      questionsCount: 20,
    },
    {
      id: '5',
      title: 'World Geography Challenge',
      category: QuizCategory.GEOGRAPHY,
      author: 'Michael Brown',
      questionsCount: 12,
    },
    {
      id: '6',
      title: 'Entertainment Trivia',
      category: QuizCategory.ENTERTAINMENT,
      author: 'Sarah Johnson',
      questionsCount: 18,
    },
    {
      id: '7',
      title: 'Tech Innovations',
      category: QuizCategory.TECHNOLOGY,
      author: 'David Wilson',
      questionsCount: 14,
    },
    {
      id: '8',
      title: 'Mathematics Fundamentals',
      category: QuizCategory.MATHEMATICS,
      author: 'Laura Martinez',
      questionsCount: 16,
    },
    {
      id: '9',
      title: 'Sports Legends',
      category: QuizCategory.SPORTS,
      author: 'John Doe',
      questionsCount: 13,
    },
    {
      id: '10',
      title: 'Music Through the Decades',
      category: QuizCategory.POP_CULTURE,
      author: 'Jane Smith',
      questionsCount: 17,
    },
    {
      id: '11',
      title: 'General Knowledge Quiz',
      category: QuizCategory.GENERAL_KNOWLEDGE,
      author: 'Alex Turner',
      questionsCount: 20,
    },
  ];

  if (filters?.category)
    filteredQuizzes = filteredQuizzes.filter(
      (quiz) => quiz.category === filters.category
    );

  if (filters?.title)
    filteredQuizzes = filteredQuizzes.filter((quiz) =>
      quiz.title.toLowerCase().includes(filters.title!.toLowerCase())
    );

  if (filters?.author)
    filteredQuizzes = filteredQuizzes.filter((quiz) =>
      quiz.author.toLowerCase().includes(filters.author!.toLowerCase())
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
