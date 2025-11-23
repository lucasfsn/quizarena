import { QUIZ_FORM_CONSTRAINTS } from '@/app/features/quiz-create/constants/quiz-form-consts';
import { QuestionForm } from '@/app/features/quiz-create/types/quiz-form';
import { QuizFormConsts } from '@/app/features/quiz-create/types/quiz-form-consts';
import { Button } from '@/app/shared/components/button/button';
import { Component, computed, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';

export interface QuestionData {
  form: FormGroup<QuestionForm>;
  index: number;
  totalCount: number;
}

@Component({
  selector: 'app-question',
  imports: [Textarea, FloatLabel, ReactiveFormsModule, Checkbox, InputText, Button],
  templateUrl: './question.html',
  styleUrl: './question.scss',
})
export class Question {
  protected readonly limits: QuizFormConsts = QUIZ_FORM_CONSTRAINTS;

  public data = input.required<QuestionData>();
  public addAnswer = output<void>();
  public removeAnswer = output<number>();
  public removeQuestion = output<void>();

  protected readonly answers = computed(() => this.data().form.controls.answers);
}
