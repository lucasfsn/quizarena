import { AnswerForm } from '@/app/features/quizzes/types/answer-form';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface QuestionForm {
  text: FormControl<string>;
  answers: FormArray<FormGroup<AnswerForm>>;
}
