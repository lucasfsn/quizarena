import { Question } from '@/app/features/quiz-create/components/question/question';
import { Title } from '@/app/features/quiz-create/components/title/title';
import { Button } from '@/app/shared/components/button/button';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-create',
  imports: [Title, Question, Button, ReactiveFormsModule],
  templateUrl: './quiz-create.html',
  styleUrl: './quiz-create.scss',
})
export class QuizCreate {
  protected readonly MIN_ANSWERS = 2;
  protected readonly MAX_ANSWERS = 4;
  protected readonly MIN_QUESTIONS = 1;
  protected readonly MAX_QUESTIONS = 20;

  private readonly formBuilder = new FormBuilder();
  protected readonly form = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(2)]],
    questions: this.formBuilder.array([]),
  });
  protected readonly questions = this.form.controls.questions as FormArray;

  public constructor() {
    this.addQuestion();
  }

  protected addQuestion(): void {
    if (this.questions.length >= this.MAX_QUESTIONS) return;

    const q = this.formBuilder.group({
      text: ['', [Validators.required, Validators.minLength(2)]],
      answers: this.formBuilder.array([this.createAnswer(), this.createAnswer()]),
    });

    this.questions.push(q);
  }

  protected removeQuestion(index: number): void {
    console.log(index);
    if (this.questions.length <= this.MIN_QUESTIONS) return;
    this.questions.removeAt(index);
  }

  protected createAnswer(text: string = '', isCorrect: boolean = false): FormGroup {
    return this.formBuilder.group({
      text: [text, Validators.required],
      isCorrect: [isCorrect],
    });
  }

  protected getAnswers(index: number): FormArray {
    return this.questions.at(index).get('answers') as FormArray;
  }

  protected addAnswer(qIndex: number): void {
    this.getAnswers(qIndex).push(this.createAnswer());
  }

  protected removeAnswer(qIndex: number, aIndex: number): void {
    const answers = this.getAnswers(qIndex);
    if (answers.length <= this.MIN_ANSWERS) return;
    answers.removeAt(aIndex);
  }

  protected createQuiz(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();

      return;
    }

    console.log(this.form.value);
  }

  protected get questionControls(): FormGroup[] {
    return this.questions.controls as FormGroup[];
  }
}
