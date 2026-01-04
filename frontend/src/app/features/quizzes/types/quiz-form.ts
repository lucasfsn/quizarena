import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface AnswerForm {
  text: FormControl<string>;
  isCorrect: FormControl<boolean>;
}

export interface QuestionForm {
  text: FormControl<string>;
  answers: FormArray<FormGroup<AnswerForm>>;
}

export interface QuizForm {
  title: FormControl<string>;
  category: FormControl<QuizCategory>;
  questions: FormArray<FormGroup<QuestionForm>>;
}
