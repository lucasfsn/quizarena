import { QuizFormConsts } from '@/app/features/quiz-create/types/quiz-form-consts';

export const QUIZ_FORM_CONSTRAINTS: QuizFormConsts = {
  MIN_QUESTIONS: 1,
  MAX_QUESTIONS: 20,
  MIN_ANSWERS: 2,
  MAX_ANSWERS: 4,
  MIN_TEXT_LENGTH: 2,
} as const;
