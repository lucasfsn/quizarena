import { QuizSkeleton } from '@/app/features/quizzes/components/quiz-skeleton/quiz-skeleton';
import { Quiz } from '@/app/features/quizzes/components/quiz/quiz';
import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { Quizzes } from '@/app/features/quizzes/services/quizzes/quizzes';
import { QuizItem } from '@/app/features/quizzes/types/quiz-item';
import { Button } from '@/app/shared/components/button/button';
import { Component, computed, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [Quiz, Button, QuizSkeleton],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List implements OnInit {
  protected quizFiltersService = inject(QuizFilters);
  protected quizzesService = inject(Quizzes);

  private readonly PAGE_SIZE = 10;
  protected isLoading = this.quizzesService.loading;

  protected skeletonItems = computed(() => {
    const loaded = this.quizzesService.loadedQuizzes().length;
    const total = this.quizzesService.totalCount();

    if (loaded === 0) return Array(this.PAGE_SIZE).fill(null);

    const remaining = Math.max(total - loaded, 0);
    const skeletonCount = Math.min(this.PAGE_SIZE, remaining);

    return Array(skeletonCount).fill(null);
  });

  protected hasMore = computed(() => {
    const loaded = this.quizzesService.loadedQuizzes().length;
    const total = this.quizzesService.totalCount();

    const filtered = this.quizzes().length;

    const filters = this.quizFiltersService.filters();
    const hasActiveFilters = filters.category || filters.title || filters.author;

    if (hasActiveFilters) return loaded < total && filtered === loaded;

    return loaded < total;
  });

  protected loadMore(): void {
    if (this.hasMore() && !this.isLoading()) this.quizzesService.getMoreQuizzes(this.PAGE_SIZE);
  }

  protected quizzes = computed<QuizItem[]>(() => {
    const filters = this.quizFiltersService.filters();

    return this.quizzesService.loadedQuizzes().filter((quiz) => {
      const { category, title, author } = quiz;

      const matchesCategory = !filters.category || category === filters.category;
      const matchesTitle =
        !filters.title || title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesAuthor =
        !filters.author || author?.toLowerCase().includes(filters.author.toLowerCase());

      return matchesCategory && matchesTitle && matchesAuthor;
    });
  });

  public ngOnInit(): void {
    this.quizFiltersService.reset();
    this.quizzesService.getInitialQuizzes(this.PAGE_SIZE);
  }
}
