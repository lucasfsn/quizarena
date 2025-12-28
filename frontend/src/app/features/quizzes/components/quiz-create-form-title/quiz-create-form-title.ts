import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';

@Component({
  selector: 'app-quiz-create-form-title',
  imports: [InputText, FloatLabel, ReactiveFormsModule],
  templateUrl: './quiz-create-form-title.html',
  styleUrl: './quiz-create-form-title.scss',
})
export class QuizCreateFormTitle {
  public control = input.required<FormControl<string | null>>();
}
