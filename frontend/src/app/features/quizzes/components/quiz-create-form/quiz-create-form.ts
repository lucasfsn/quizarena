import {
    QuizCreateFormQuestion,
    QuizCreateFormQuestionData,
} from '@/app/features/quizzes/components/quiz-create-form-question/quiz-create-form-question';
import { QuizCreateFormTitle } from '@/app/features/quizzes/components/quiz-create-form-title/quiz-create-form-title';
import { QUIZ_FORM_CONSTRAINTS } from '@/app/features/quizzes/constants/quiz-form-consts';
import { QuizCreatePayload } from '@/app/features/quizzes/types/quiz-create-payload';
import { AnswerForm, QuestionForm, QuizForm } from '@/app/features/quizzes/types/quiz-form';
import { QuizFormConsts } from '@/app/features/quizzes/types/quiz-form-consts';
import { Button } from '@/app/shared/components/button/button';
import { Component, input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-create-form',
  imports: [Button, ReactiveFormsModule, QuizCreateFormTitle, QuizCreateFormQuestion],
  templateUrl: './quiz-create-form.html',
  styleUrl: './quiz-create-form.scss',
})
export class QuizCreateForm implements OnInit {
  public handleSubmit = output<QuizCreatePayload>();
  public isLoading = input<boolean>(false);

  protected readonly limits: QuizFormConsts = QUIZ_FORM_CONSTRAINTS;

  private readonly formBuilder = new FormBuilder();
  protected readonly form = this.formBuilder.group<QuizForm>({
    title: this.formBuilder.control('', {
      validators: [Validators.required, Validators.minLength(this.limits.MIN_TEXT_LENGTH)],
      nonNullable: true,
    }),
    questions: this.formBuilder.array<FormGroup<QuestionForm>>([]),
  });

  protected addQuestion(): void {
    if (this.form.controls.questions.length >= this.limits.MAX_QUESTIONS) return;

    const question = this.formBuilder.group<QuestionForm>({
      text: this.formBuilder.control('', {
        validators: [Validators.required, Validators.minLength(this.limits.MIN_TEXT_LENGTH)],
        nonNullable: true,
      }),
      answers: this.formBuilder.array<FormGroup<AnswerForm>>([
        this.createAnswer(),
        this.createAnswer(),
      ]),
    });

    this.form.controls.questions.push(question);
  }

  protected removeQuestion(index: number): void {
    if (this.form.controls.questions.length <= this.limits.MIN_QUESTIONS) return;
    this.form.controls.questions.removeAt(index);
  }

  protected createAnswer(text: string = '', isCorrect: boolean = false): FormGroup<AnswerForm> {
    return this.formBuilder.group<AnswerForm>({
      text: this.formBuilder.control(text, {
        validators: [Validators.required, Validators.minLength(this.limits.MIN_TEXT_LENGTH)],
        nonNullable: true,
      }),
      isCorrect: this.formBuilder.control(isCorrect, { nonNullable: true }),
    });
  }

  protected getQuestionData(
    form: FormGroup<QuestionForm>,
    index: number,
  ): QuizCreateFormQuestionData {
    return {
      form,
      index,
      totalCount: this.form.controls.questions.length,
    };
  }

  protected addAnswer(qIndex: number): void {
    const answers = this.form.controls.questions.at(qIndex).controls.answers;
    if (answers.length >= this.limits.MAX_ANSWERS) return;
    answers.push(this.createAnswer());
  }

  protected removeAnswer(qIndex: number, aIndex: number): void {
    const answers = this.form.controls.questions.at(qIndex).controls.answers;
    if (answers.length <= this.limits.MIN_ANSWERS) return;
    answers.removeAt(aIndex);
  }

  protected createQuiz(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    this.handleSubmit.emit(this.form.getRawValue() as QuizCreatePayload);
  }

  public ngOnInit(): void {
    this.addQuestion();
  }
}
