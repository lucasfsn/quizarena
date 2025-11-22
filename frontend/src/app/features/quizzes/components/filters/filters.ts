import { Author } from '@/app/features/quizzes/components/author/author';
import { Category } from '@/app/features/quizzes/components/category/category';
import { Title } from '@/app/features/quizzes/components/title/title';
import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-filters',
  imports: [Category, Title, Author],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  public disabled = input.required<boolean>();

  protected quizFiltersService = inject(QuizFilters);

  protected get showAuthorFilter(): boolean {
    return this.quizFiltersService.showAuthorFilter();
  }
}
