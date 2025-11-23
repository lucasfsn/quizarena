import { QUIZ_FORM_CONSTRAINTS } from '@/app/features/quizzes/constants/quiz-form-consts';
import { QuestionForm } from '@/app/features/quizzes/types/quiz-form';
import { QuizFormConsts } from '@/app/features/quizzes/types/quiz-form-consts';
import { Button } from '@/app/shared/components/button/button';
import { Component, computed, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';

export interface QuizCreateFormQuestionData {
  form: FormGroup<QuestionForm>;
  index: number;
  totalCount: number;
}

@Component({
  selector: 'app-quiz-create-form-question',
  imports: [Textarea, FloatLabel, ReactiveFormsModule, Checkbox, InputText, Button],
  templateUrl: './quiz-create-form-question.html',
  styleUrl: './quiz-create-form-question.scss',
})
export class QuizCreateFormQuestion {
  protected readonly limits: QuizFormConsts = QUIZ_FORM_CONSTRAINTS;

  public isLoading = input<boolean>(false);
  public data = input.required<QuizCreateFormQuestionData>();
  public addAnswer = output<void>();
  public removeAnswer = output<number>();
  public removeQuestion = output<void>();

  protected readonly answers = computed(() => this.data().form.controls.answers);
}
