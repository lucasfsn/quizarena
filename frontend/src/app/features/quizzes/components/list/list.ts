import { MOCK_QUIZZES } from '@/app/dev/quiz-list';
import { Quiz } from '@/app/features/quizzes/components/quiz/quiz';
import { QuizFilters } from '@/app/features/quizzes/services/quiz-filters/quiz-filters';
import { QuizItem } from '@/app/features/quizzes/types/quiz-item';
import { Component, computed, inject } from '@angular/core';

@Component({
  selector: 'app-list',
  imports: [Quiz],
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  protected quizFiltersService = inject(QuizFilters);

  // Mock data
  private readonly allQuizzes = MOCK_QUIZZES;

  protected quizzes = computed<QuizItem[]>(() => {
    const filters = this.quizFiltersService.filters();

    return this.allQuizzes.filter((quiz) => {
      const matchesCategory = !filters.category || quiz.category === filters.category;
      const matchesTitle =
        !filters.title || quiz.title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesAuthor =
        !filters.author || quiz.author?.toLowerCase().includes(filters.author.toLowerCase());

      return matchesCategory && matchesTitle && matchesAuthor;
    });
  });
}
