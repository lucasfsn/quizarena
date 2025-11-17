import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';

export function getCategoryImagePath(category: QuizCategory): string {
  const categories: Record<QuizCategory, string> = {
    [QuizCategory.GENERAL_KNOWLEDGE]: 'general_knowledge',
    [QuizCategory.SCIENCE_AND_NATURE]: 'science_and_nature',
    [QuizCategory.HISTORY]: 'history',
    [QuizCategory.GEOGRAPHY]: 'geography',
    [QuizCategory.SPORTS]: 'sports',
    [QuizCategory.ENTERTAINMENT]: 'entertainment',
    [QuizCategory.ART_AND_LITERATURE]: 'art_and_literature',
    [QuizCategory.TECHNOLOGY]: 'technology',
    [QuizCategory.MATHEMATICS]: 'mathematics',
    [QuizCategory.POP_CULTURE]: 'pop_culture',
    [QuizCategory.COMMUNITY]: 'community',
  } as const;

  return `/assets/images/categories/${categories[category]}.webp`;
}
