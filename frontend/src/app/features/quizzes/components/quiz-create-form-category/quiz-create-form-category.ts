import { QUIZ_CATEGORY_LABELS } from '@/app/features/quizzes/constants/quiz-category-labels';
import { CategoryOption } from '@/app/features/quizzes/types/category-option';
import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-quiz-create-form-category',
  imports: [FloatLabel, Select, ReactiveFormsModule],
  templateUrl: './quiz-create-form-category.html',
  styleUrl: './quiz-create-form-category.scss',
})
export class QuizCreateFormCategory {
  public control = input.required<FormControl<string | null>>();

  protected readonly categories: CategoryOption[] = Object.values(
    QuizCategory
  ).map((category) => ({
    label: QUIZ_CATEGORY_LABELS[category],
    value: category,
  }));
}
