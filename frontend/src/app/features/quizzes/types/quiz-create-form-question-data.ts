import { QuestionForm } from '@/app/features/quizzes/types/question-form';
import { FormGroup } from '@angular/forms';

export interface QuizCreateFormQuestionData {
  form: FormGroup<QuestionForm>;
  index: number;
  totalCount: number;
}
