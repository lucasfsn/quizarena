import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';

export interface QuizPreview {
  id: string;
  title: string;
  category: QuizCategory;
  author: {
    firstName: string;
    lastName: string;
  };
  questionsCount: number;
}
