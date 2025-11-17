import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { Component, OnInit, output } from '@angular/core';
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
  public categoryChange = output<QuizCategory | undefined>();

  protected readonly categories: CategoryOption[] = Object.values(QuizCategory).map((category) => ({
    name: category,
  }));

  protected readonly form = new FormControl<CategoryOption | null>(null);

  public ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.categoryChange.emit(value?.name);
    });
  }
}
