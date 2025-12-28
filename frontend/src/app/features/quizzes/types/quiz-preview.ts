import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';

export interface QuizPreview {
  id: string;
  title: string;
  category: QuizCategory;
  author: string | null;
  questionsCount: number;
}
