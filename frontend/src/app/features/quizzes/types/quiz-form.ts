import { QuestionForm } from '@/app/features/quizzes/types/question-form';
import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface QuizForm {
  title: FormControl<string>;
  category: FormControl<QuizCategory>;
  questions: FormArray<FormGroup<QuestionForm>>;
}
