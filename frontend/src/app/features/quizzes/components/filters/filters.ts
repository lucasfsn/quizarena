import { Author } from '@/app/features/quizzes/components/author/author';
import { Category } from '@/app/features/quizzes/components/category/category';
import { Title } from '@/app/features/quizzes/components/title/title';
import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-filters',
  imports: [Category, Title, Author],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  protected quizFiltersService = inject(QuizFilters);

  protected get showAuthorFilter(): boolean {
    return this.quizFiltersService.showAuthorFilter();
  }

  protected onCategoryChange(category?: QuizCategory): void {
    this.quizFiltersService.setCategory(category);
  }

  protected onTitleChange(title?: string): void {
    this.quizFiltersService.setTitle(title);
  }

  protected onAuthorChange(author?: string): void {
    this.quizFiltersService.setAuthor(author);
  }
}
