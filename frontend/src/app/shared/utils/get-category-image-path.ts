import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';

export function getCategoryImagePath(category: QuizCategory): string {
  const imageName = Object.keys(QuizCategory)
    .find((key) => QuizCategory[key as keyof typeof QuizCategory] === category)!
    .toLowerCase();

  return `/assets/images/categories/${imageName}.webp`;
}
