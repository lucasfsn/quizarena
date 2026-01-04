export enum QuizCategory {
  GENERAL_KNOWLEDGE = 'GENERAL_KNOWLEDGE',
  SCIENCE_AND_NATURE = 'SCIENCE_AND_NATURE',
  HISTORY = 'HISTORY',
  GEOGRAPHY = 'GEOGRAPHY',
  SPORTS = 'SPORTS',
  ENTERTAINMENT = 'ENTERTAINMENT',
  ART_AND_LITERATURE = 'ART_AND_LITERATURE',
  TECHNOLOGY = 'TECHNOLOGY',
  MATHEMATICS = 'MATHEMATICS',
  POP_CULTURE = 'POP_CULTURE',
}

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
