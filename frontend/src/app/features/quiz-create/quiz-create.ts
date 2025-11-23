import { Question, QuestionData } from '@/app/features/quiz-create/components/question/question';
import { Title } from '@/app/features/quiz-create/components/title/title';
import { QUIZ_FORM_CONSTRAINTS } from '@/app/features/quiz-create/constants/quiz-form-consts';
import { AnswerForm, QuestionForm, QuizForm } from '@/app/features/quiz-create/types/quiz-form';
import { QuizFormConsts } from '@/app/features/quiz-create/types/quiz-form-consts';
import { Button } from '@/app/shared/components/button/button';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-create',
  imports: [Title, Question, Button, ReactiveFormsModule],
  templateUrl: './quiz-create.html',
  styleUrl: './quiz-create.scss',
})
export class QuizCreate implements OnInit {
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

  protected getQuestionData(form: FormGroup<QuestionForm>, index: number): QuestionData {
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

    console.log(this.form.value);
  }

  public ngOnInit(): void {
    this.addQuestion();
  }
}
