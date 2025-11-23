import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { Component, DestroyRef, effect, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';

interface CategoryOption {
  name: QuizCategory;
}

@Component({
  selector: 'app-quizzes-filters-category',
  imports: [FloatLabel, Select, ReactiveFormsModule],
  templateUrl: './quizzes-filters-category.html',
  styleUrl: './quizzes-filters-category.scss',
})
export class QuizzesFiltersCategory implements OnInit {
  public disabled = input.required<boolean>();
  private destroyRef = inject(DestroyRef);

  protected quizFiltersService = inject(QuizFilters);

  public constructor() {
    effect(() => {
      if (this.disabled()) this.form.disable({ emitEvent: false });
      else this.form.enable({ emitEvent: false });
    });
  }

  protected readonly categories: CategoryOption[] = Object.values(QuizCategory).map((category) => ({
    name: category,
  }));

  protected readonly form = new FormControl<CategoryOption | null>(null);

  public ngOnInit(): void {
    const subscription = this.form.valueChanges.subscribe((value) => {
      this.quizFiltersService.setCategory(value?.name);
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
