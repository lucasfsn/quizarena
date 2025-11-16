import { Author } from '@/app/features/quizzes/components/author/author';
import { Category } from '@/app/features/quizzes/components/category/category';
import { Title } from '@/app/features/quizzes/components/title/title';
import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { Component } from '@angular/core';

@Component({
  selector: 'app-filters',
  imports: [Category, Title, Author],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  protected showAuthorFilter = false;

  protected onCategoryChange(category?: QuizCategory): void {
    this.showAuthorFilter = category === QuizCategory.COMMUNITY;
  }
}
