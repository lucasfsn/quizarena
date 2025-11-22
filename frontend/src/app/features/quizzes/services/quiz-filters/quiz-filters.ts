import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { QuizzesFilters } from '@/app/features/quizzes/types/quizzes-filters';
import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuizFilters {
  private readonly category = signal<QuizCategory | undefined>(undefined);
  private readonly title = signal<string | undefined>(undefined);
  private readonly author = signal<string | undefined>(undefined);

  public filters = computed<QuizzesFilters>(() => ({
    category: this.category(),
    title: this.title(),
    author: this.author(),
  }));

  public showAuthorFilter = computed(() => this.category() === QuizCategory.COMMUNITY);

  public setCategory(category?: QuizCategory): void {
    this.category.set(category);

    if (category !== QuizCategory.COMMUNITY) this.author.set(undefined);
  }

  public setTitle(title?: string): void {
    this.title.set(title);
  }

  public setAuthor(author?: string): void {
    this.author.set(author);
  }
}
