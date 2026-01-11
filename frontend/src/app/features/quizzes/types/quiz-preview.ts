import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';

export interface QuizPreviewAuthor {
  firstName: string;
  lastName: string;
}

export interface QuizPreview {
  id: string;
  title: string;
  category: QuizCategory;
  author: QuizPreviewAuthor;
  questionsCount: number;
}
