import { Authorization } from '@/app/core/auth/authorization';
import { QUIZ_CATEGORY_LABELS } from '@/app/features/quizzes/types/quiz-category';
import { QuizPreview } from '@/app/features/quizzes/types/quiz-preview';
import { getCategoryImagePath } from '@/app/shared/utils/get-category-image-path';
import { GameActions } from '@/app/store/actions/game.actions';
import { GameStatus } from '@/app/store/reducers/game.reducers';
import { selectGameStatus } from '@/app/store/selectors/game.selectors';
import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-quizzes-quiz-item',
  imports: [NgOptimizedImage],
  templateUrl: './quizzes-quiz-item.html',
  styleUrl: './quizzes-quiz-item.scss',
})
export class QuizzesQuizItem {
  private readonly store = inject(Store);
  private readonly authorizationService = inject(Authorization);

  public quiz = input.required<QuizPreview>();

  protected readonly categoryLabels = QUIZ_CATEGORY_LABELS;

  protected readonly status = this.store.selectSignal(selectGameStatus);

  protected categoryImagePath = computed(() =>
    getCategoryImagePath(this.quiz().category)
  );

  protected readonly GameStatus = GameStatus;

  protected isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  protected handleStartQuizClick(quizId: string): void {
    this.store.dispatch(GameActions.createLobby({ quizId }));
  }
}
