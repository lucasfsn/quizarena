import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { Component, effect, inject, input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';

interface CategoryOption {
  name: QuizCategory;
}

@Component({
  selector: 'app-category',
  imports: [FloatLabel, Select, ReactiveFormsModule],
  templateUrl: './category.html',
  styleUrl: './category.scss',
})
export class Category implements OnInit {
  protected quizFiltersService = inject(QuizFilters);
  public disabled = input.required<boolean>();

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
    this.form.valueChanges.subscribe((value) => {
      this.quizFiltersService.setCategory(value?.name);
    });
  }
}
