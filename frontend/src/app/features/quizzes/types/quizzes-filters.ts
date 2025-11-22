import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';

export interface QuizzesFilters {
  category?: QuizCategory;
  title?: string;
  author?: string;
}
