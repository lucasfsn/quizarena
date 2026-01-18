import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';

export const QUIZ_CATEGORY_LABELS: Record<QuizCategory, string> = {
  [QuizCategory.GENERAL_KNOWLEDGE]: 'General Knowledge',
  [QuizCategory.SCIENCE_AND_NATURE]: 'Science & Nature',
  [QuizCategory.HISTORY]: 'History',
  [QuizCategory.GEOGRAPHY]: 'Geography',
  [QuizCategory.SPORTS]: 'Sports',
  [QuizCategory.ENTERTAINMENT]: 'Entertainment',
  [QuizCategory.ART_AND_LITERATURE]: 'Art & Literature',
  [QuizCategory.TECHNOLOGY]: 'Technology',
  [QuizCategory.MATHEMATICS]: 'Mathematics',
  [QuizCategory.POP_CULTURE]: 'Pop Culture',
};
