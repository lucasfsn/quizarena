import { FormControl } from '@angular/forms';

export interface AnswerForm {
  text: FormControl<string>;
  isCorrect: FormControl<boolean>;
}
