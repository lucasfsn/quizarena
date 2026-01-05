import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';

export function getCategoryImagePath(category: QuizCategory): string {
  return `/assets/images/categories/${category.toLowerCase()}.webp`;
}
