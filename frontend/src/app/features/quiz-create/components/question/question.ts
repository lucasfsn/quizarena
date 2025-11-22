import { Button } from '@/app/shared/components/button/button';
import { Component, computed, input, output } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';

@Component({
  selector: 'app-question',
  imports: [Textarea, FloatLabel, ReactiveFormsModule, Checkbox, InputText, Button],
  templateUrl: './question.html',
  styleUrl: './question.scss',
})
export class Question {
  public minAnswers = input.required<number>();
  public maxAnswers = input.required<number>();
  public minQuestions = input.required<number>();
  public questionForm = input.required<FormGroup>();
  public questionIndex = input.required<number>();
  public questionsCount = input.required<number>();
  public addAnswer = output<void>();
  public removeAnswer = output<number>();
  public removeQuestion = output<void>();

  protected answers = computed(() => this.questionForm().get('answers') as FormArray);
}
