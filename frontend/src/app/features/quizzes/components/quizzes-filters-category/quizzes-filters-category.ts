import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { CategoryOption } from '@/app/features/quizzes/types/category-option';
import {
  QUIZ_CATEGORY_LABELS,
  QuizCategory,
} from '@/app/features/quizzes/types/quiz-category';
import {
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-quizzes-filters-category',
  imports: [FloatLabel, Select, ReactiveFormsModule],
  templateUrl: './quizzes-filters-category.html',
  styleUrl: './quizzes-filters-category.scss',
})
export class QuizzesFiltersCategory implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly quizFiltersService = inject(QuizFilters);

  public disabled = input.required<boolean>();

  public constructor() {
    effect(() => {
      if (this.disabled()) this.form.disable({ emitEvent: false });
      else this.form.enable({ emitEvent: false });
    });
  }

  protected readonly categories: CategoryOption[] = Object.values(
    QuizCategory
  ).map((category) => ({
    label: QUIZ_CATEGORY_LABELS[category],
    value: category,
  }));

  protected readonly form = new FormControl<CategoryOption | null>(null);

  public ngOnInit(): void {
    const subscription = this.form.valueChanges.subscribe((val) => {
      this.quizFiltersService.setCategory(val?.value);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
