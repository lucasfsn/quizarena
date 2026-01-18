import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';

export interface QuizCreatePayload {
  title: string;
  category: QuizCategory;
  questions: {
    text: string;
    answers: { text: string; isCorrect: boolean }[];
  }[];
}
