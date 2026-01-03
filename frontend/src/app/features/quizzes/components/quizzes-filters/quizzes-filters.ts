import { QuizzesFiltersAuthor } from '@/app/features/quizzes/components/quizzes-filters-author/quizzes-filters-author';
import { QuizzesFiltersCategory } from '@/app/features/quizzes/components/quizzes-filters-category/quizzes-filters-category';
import { QuizzesFiltersTitle } from '@/app/features/quizzes/components/quizzes-filters-title/quizzes-filters-title';
import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-quizzes-filters',
  imports: [QuizzesFiltersAuthor, QuizzesFiltersTitle, QuizzesFiltersCategory],
  templateUrl: './quizzes-filters.html',
  styleUrl: './quizzes-filters.scss',
})
export class QuizzesFilters {
  private readonly quizFiltersService = inject(QuizFilters);

  public disabled = input.required<boolean>();

  protected readonly showAuthorFilter =
    this.quizFiltersService.showAuthorFilter;
}
