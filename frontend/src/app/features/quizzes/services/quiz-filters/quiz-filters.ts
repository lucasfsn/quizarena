import { QuizCategory } from '@/app/features/quizzes/types/quiz-category';
import { computed, Injectable, signal } from '@angular/core';

export interface QuizFiltersState {
  category?: QuizCategory;
  title?: string;
  author?: string;
}

@Injectable({
  providedIn: 'root',
})
export class QuizFilters {
  private readonly categorySignal = signal<QuizCategory | undefined>(undefined);
  private readonly titleSignal = signal<string | undefined>(undefined);
  private readonly authorSignal = signal<string | undefined>(undefined);

  public filters = computed<QuizFiltersState>(() => ({
    category: this.categorySignal(),
    title: this.titleSignal(),
    author: this.authorSignal(),
  }));

  public showAuthorFilter = computed(() => this.categorySignal() === QuizCategory.COMMUNITY);

  public setCategory(category?: QuizCategory): void {
    this.categorySignal.set(category);

    if (category !== QuizCategory.COMMUNITY) this.authorSignal.set(undefined);
  }

  public setTitle(title?: string): void {
    this.titleSignal.set(title);
  }

  public setAuthor(author?: string): void {
    this.authorSignal.set(author);
  }

  public reset(): void {
    this.categorySignal.set(undefined);
    this.titleSignal.set(undefined);
    this.authorSignal.set(undefined);
  }
}
