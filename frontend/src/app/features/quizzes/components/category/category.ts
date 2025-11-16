import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { Component, OnInit, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';

interface CategoryOption {
  id: number;
  name: QuizCategory;
}

@Component({
  selector: 'app-category',
  imports: [FloatLabel, Select, ReactiveFormsModule],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category implements OnInit {
  public categoryChange = output<QuizCategory | undefined>();

  // TODO: Fetch categories from API
  protected readonly categories: CategoryOption[] = [
    { id: 1, name: QuizCategory.GENERAL_KNOWLEDGE },
    { id: 2, name: QuizCategory.SCIENCE_AND_NATURE },
    { id: 3, name: QuizCategory.HISTORY },
    { id: 4, name: QuizCategory.GEOGRAPHY },
    { id: 5, name: QuizCategory.SPORTS },
    { id: 6, name: QuizCategory.ENTERTAINMENT },
    { id: 7, name: QuizCategory.ART_AND_LITERATURE },
    { id: 8, name: QuizCategory.TECHNOLOGY },
    { id: 9, name: QuizCategory.MATHEMATICS },
    { id: 10, name: QuizCategory.POP_CULTURE },
    { id: 11, name: QuizCategory.COMMUNITY },
  ];

  protected readonly form = new FormControl<CategoryOption | null>(null);

  public ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.categoryChange.emit(value?.name);
    });
  }
}
